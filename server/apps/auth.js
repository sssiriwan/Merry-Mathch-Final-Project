import { Router } from "express";
// import { pool } from "../utils/supabaseClient.js";
import { supabase } from "../utils/supabaseClient.js";
// import multer from "multer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();
authRouter.post("/register", async (req, res) => {
  try {
    const hobbiesSplit = req.body.tags.split(", ")
    const user = {
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
      role: "Users",
      email: req.body.email,
      location: req.body.location,
      age: req.body.age,
      hobbies: req.body.hobbies,
      created_at: new Date(),
      hobbies_tag: hobbiesSplit
    };
    
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
          hobbies_tag: user.hobbies_tag,
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
    // const { data: email } = await supabase
    //   .from("users")
    //   .select("*")
    //   .eq("email", req.body.email);

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

export default authRouter;

// ไม่ใช้แล้วค่ะ POST METHOD: REGISTER USER
// authRouter.post("/register", async (req,res) => {
//     // const avatarUrl = await
//     const user = {
//         username: req.body.username,
//         password: req.body.password,
//         // avatar_url: req.files.avatar,
//         fullname: req.body.fullname,
//         role: "Users",
//         email: req.body.email,
//         // location: req.body.location,
//         age: req.body.age,
//         hobbies: req.body.hobbies,
//         created_at: new Date(),
//     }
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//     //
//     //
//     // avatar_url,,$10, location,$9, user.location
//     await pool.query(`insert into users (username, password, fullname, role, email, age, hobbies, created_at) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
//     [user.username, user.password
//         // , user.avatar_url
//         , user.fullname, user.role, user.email, user.age, user.hobbies, user.created_at]);
//     return res.json({
//         message: "Created new account successfully"
//     })
// })

// POST METHOD: LOGIN

// authRouter.post("/login", async (req, res) => {
//   const user = await pool.query("select * from users where username=$1", [
//     req.body.username,
//   ]);
//   if (!user.rows[0]) {
//     return res.json({
//       message: "User not found: ไปสมัครก่อน!!!",
//     });
//   }

//   const isValidPassword = await bcrypt.compare(
//     req.body.password,
//     user.rows[0].password
//   );
//   if (!isValidPassword) {
//     return res.status(401).json({
//       message: "ไปใส่รหัสมาใหม่!!",
//     });
//   }
//   return res.json({
//     message: "Login successfully: แกรอด",
//   });
// });
