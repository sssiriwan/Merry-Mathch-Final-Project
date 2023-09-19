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
    console.log(hobbies)

    const files = req.files.avatar
    console.log(files)
    console.log(req.body)
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
      date_of_birth: req.body.date_of_birth,
      email: req.body.email,
      location: req.body.location,
      city: req.body.city,
      age: req.body.age,
      created_at: new Date(),
      sexual_identity: req.body.sexual_identity,
      sexual_preference: req.body.sexual_preference,
      racial_preference: req.body.racial_preference,
      meeting_interest: req.body.meeting_interest,
      hobbies_tag: req.body.hobbies_tag,
      about_me: req.body.about_me
    };
    const checkUser = await supabase.from('users').select('*').eq('username', user.username);
    if (checkUser.data[0]) {
      return res.json({
        message: "User already in used",
      })
    }
    // console.log("ถ้าไม่มี user เหมือนกันจะขึ้นอันนี้จ้า",checkUser)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await supabase
      .from("users")
      .insert([
        user
      ])
      .select();
    const userImg = await supabase.from('profile_image').insert([
      { user_id: result.data[0].user_id ,img_1: fileUrl[0], img_2: fileUrl[1], img_3: fileUrl[2], img_4: fileUrl[3], img_5: fileUrl[4] }
    ])
    const userHobbies = await supabase.from('hobbies').insert([
      { user_id: result.data[0].user_id ,hob_1: hobbies[0] ,hob_2: hobbies[1] ,hob_3: hobbies[2] ,hob_4: hobbies[3] ,hob_5: hobbies[4] ,
        hob_6: hobbies[5] ,hob_7: hobbies[6] ,hob_8: hobbies[7] ,hob_9: hobbies[8] ,hob_10: hobbies[9] ,}
    ])
    console.log(result)
    console.log("เพิ่มแถวในตารางรูป",userImg)
    console.log("เพิ่มแถวในตารางอดิเรก", userHobbies)
    const imageId = await supabase.from('profile_image').select('image_id').eq('user_id', result.data[0].user_id);
    const hobbiesId = await supabase.from('hobbies').select('hobbies_id').eq('user_id', result.data[0].user_id)
    const updateUser = await supabase.from('users').update({ image_id: imageId.data[0].image_id, hobbies_id: hobbiesId.data[0].hobbies_id}).eq('user_id', result.data[0].user_id).select();
    console.log("อัพเดทhobbiesกับimageid", updateUser)
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
    // if (error) {
    //   console.log(error);
    // }

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
