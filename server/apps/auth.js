import { Router } from "express";
// import { pool } from "../utils/supabaseClient.js";
import { supabase } from "../utils/supabaseClient.js";
import multer from "multer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();
// const multerUpload = multer({ dest: "uploads/"});
// const avatarUpload = multerUpload.fields([{name: "avatar", maxCount:5 }]);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const avatarUpload = upload.fields([{name: "avatar", maxCount:5 }]);
authRouter.post("/register", avatarUpload , async (req, res) => {
  try {
    const hobbies = req.body.tags.split(',')

    const files = req.files.avatar
    let fileUrl = []
    for(let i=0; i<files.length; i++) {
      const fileName = `${Date.now()}`
      const { data, error } = await supabase.storage.from('avatarImg').upload( fileName, files[i].buffer , {
        cacheControl: '3600',
        upsert: false,
        contentType: files[i].mimetype
      })
      // console.log(data.path)
      const result = await supabase.storage.from('avatarImg').getPublicUrl(data.path)
      // console.log(result.data)
      fileUrl.push(result.data.publicUrl)
      if(error) {
        console.log(error)
      }
    }
    // console.log(fileUrl)
    const user = {
      username: req.body.username,
      password: req.body.password,
      fullname: req.body.fullname,
      role: "Users",
      email: req.body.email,
      created_at: new Date(),
    };
    const checkUser = await supabase.from('users').select('*').eq('username', user.username);
    if (checkUser.data[0]) {
      return res.json({
        message: "User already in used",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await supabase
      .from("users")
      .insert([
        user
      ])
      .select();
      console.log(result)
    const userImg = await supabase.from('profile_image').insert([
      { user_id: result.data[0].user_id ,img_1: fileUrl[0], img_2: fileUrl[1], img_3: fileUrl[2], img_4: fileUrl[3], img_5: fileUrl[4] }
    ]).select()
    console.log("เพิ่มแถวในตารางรูป",userImg)
    const userHobbies = await supabase.from('hobbies').insert([
      { user_id: result.data[0].user_id ,hob_1: hobbies[0] ,hob_2: hobbies[1] ,hob_3: hobbies[2] ,hob_4: hobbies[3] ,hob_5: hobbies[4] ,
        hob_6: hobbies[5] ,hob_7: hobbies[6] ,hob_8: hobbies[7] ,hob_9: hobbies[8] ,hob_10: hobbies[9] ,}
    ]).select()
    console.log("เพิ่มแถวในตารางอดิเรก", userHobbies)
    const userProfile = {
      fullname: req.body.fullname,
      date_of_birth: req.body.date_of_birth,
      location: req.body.location,
      city: req.body.city,
      created_at: new Date(),
      sexual_identity: req.body.sexual_identity,
      sexual_preference: req.body.sexual_preference,
      racial_preference: req.body.racial_preference,
      meeting_interest: req.body.meeting_interest,
      hobbies_id: userHobbies.data[0].hobbies_id,
      image_id: userImg.data[0].image_id,
      user_id: result.data[0].user_id
    };
    const resultUserProfile = await supabase.from('profiles').insert([ userProfile ]).select()
    console.log("เพิ่มแถวในprofiles",resultUserProfile)
    return res.json({
      message: `Created new account successfully`,
    });
  } catch (error) {
    console.log("catch เออเร่อ",error);
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
    const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Password is invalid",
      });
    }
    const token = jwt.sign(
      { id: user[0].user_id, username: user[0].username, role: user[0].role },
      process.env.SUPABASE_JWT_KEY,
      { expiresIn: "9000000" }
    );
    console.log(req.user);
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
authRouter.post("/complaint", async (req, res) => {
  try {
    console.log(req.body);
    
    const complainItem = {
      user_id: req.body.userId,
      issue: req.body.issue,
      description: req.body.description,
      //มาแก้แบบฟอร์มวันที่ในอนาคต
      created_at:  new Date(),
      complaint_status: req.body.status,
    };
    
    const result = await supabase
  .from('complaints')
  .insert([
    {
      user_id: complainItem.user_id,
      issue: complainItem.issue,
      description: complainItem.description,
      created_at: complainItem.created_at,
      complaint_status: complainItem.complaint_status
    },
  ])
  .select()
   
    return res.json({
      message: "add complaint successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

// user สามารถดู package ได้
authRouter.get("/package", async (req, res) => {
  try {
    const result = await supabase
      .from("merry_packages")
      .select("*")
      .order("price", { ascending: true })
      // .limit()
    return res.json({
      data: result.data,
    });
  } catch (error) {
    console.error("Error in /package route:", error);
  }
});

authRouter.get("/package/:packageId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("merry_packages")
      .select("*")
      .eq('package_id', req.params.packageId);
    return res.json({
      data: data,
    });
  } catch (error) {
    console.error("Error in /package route:", error);
  }
});


export default authRouter;


