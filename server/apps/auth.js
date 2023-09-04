import { Router } from "express";
import { pool } from "../utils/supabaseClient.js";
// import multer from "multer"
import bcrypt from "bcrypt"

const authRouter = Router();
// const multerUpload = multer({ dest: "uploads/"});
// const avatarUpload = multerUpload.fields([{name: "avatar", maxCount:5 }]);

authRouter.post("/register", async (req,res) => {
    // const avatarUrl = await
    const user = {
        username: req.body.username,
        password: req.body.password,
        // avatar_url: req.files.avatar,
        fullname: req.body.fullname,
        role: "Users",
        email: req.body.email,
        // location: req.body.location,
        age: req.body.age,
        hobbies: req.body.hobbies,
        created_at: new Date(),
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // 
    // 
    // avatar_url,,$10, location,$9, user.location
    await pool.query(`insert into users (username, password, fullname, role, email, age, hobbies, created_at) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [user.username, user.password
        // , user.avatar_url
        , user.fullname, user.role, user.email, user.age, user.hobbies, user.created_at]);
    return res.json({
        message: "Created new account successfully"
    })
})

authRouter.post("/login", async (req,res) => {
    const user = await pool.query('select * from users where username=$1', [req.body.username]);
    if(!user.rows[0]) {
        return res.json({
            message: "User not found: ไปสมัครก่อน!!!"
        })
    } 
    
    const isValidPassword = await bcrypt.compare(req.body.password, user.rows[0].password);
    if(!isValidPassword) {
        return res.status(401).json({
            message: "ไปใส่รหัสมาใหม่!!"
        })
    }
    return res.json({
        message: "Login successfully: แกรอด"
    })
})

authRouter.get("/", async (req,res) => {
    const result = await pool.query("select * from users")
    return res.json({
        data: result.rows,
    })
});



export default authRouter