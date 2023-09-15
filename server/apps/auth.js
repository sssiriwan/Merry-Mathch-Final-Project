import { Router } from "express";
// import { pool } from "../utils/supabaseClient.js";
import { supabase } from "../utils/supabaseClient.js";
// import multer from "multer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();
// const multerUpload = multer({ dest: "uploads/"});
// const avatarUpload = multerUpload.fields([{name: "avatar", maxCount:5 }]);
authRouter.post("/register" , async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      image_url: req.body.image,
      role: "Users",
      created_at: new Date(),
    }
    const checkUser = await supabase.from('users').select('*').eq('username', user.username);
    if (checkUser.data[0]) {
      return res.json({
        message: "User already in used",
      })
    }
    console.log(checkUser)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await supabase
      .from("users")
      .insert([
        {
          username: user.username,
          password: user.password,
          age: 22,
          created_at: user.created_at,
          role: user.role,
          image_url: user.image_url,
        },
      ])
      .select();

    return res.json({
      message: `Created new account successfully`,
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", req.body.username);
    if (error) {
      console.log(error);
    }

    if (!user[0]) {
      return res.status(404).json({
        message: "username or email not found",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Password is invalid",
      });
    }
    const token = jwt.sign(
      { id: user[0].user_id, username: user[0].username, role: user[0].role },
      process.env.SUPABASE_JWT_KEY,
      { expiresIn: "900000" }
    );
    console.log(req.user)
    return res.json({
      data: user[0],
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/", async (req, res) => {
  try {
    const result = await supabase.from("users").select("*");
    return res.json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//User สามารถสร้าง Complain ได้
authRouter.post('/complaint', async (req, res) => {
  try {
    console.log(req.body);
    const complainItem = {
      
      issue: req.body.issue,
      description: req.body.description,
      created_at: new Date(),
      status: req.body.status,
    };
    const result = await supabase.from('complaints').insert([
      {
        // user_id: req.body.user_id,
        issue: complainItem.issue,
        description: complainItem.description,
        created_at: new Date(),
        status: complainItem.status,
      },
    ]);
    return res.json({
      message: "add complaint successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});


export default authRouter;
