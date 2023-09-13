import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { supabase } from "../utils/supabaseClient.js";

const postRouter = Router();
postRouter.use(protect);

postRouter.get('/', async (req,res) => {
    // console.log(req.user)
    return res.json({
        data: req.user
    })
})
// API get profile (เทียบ user_id)
postRouter.get('/profile', async (req,res) => {
    console.log(req.user)
    const {data, error} = await supabase.from('users').select('*').eq('user_id', req.user.id)
    return res.json({
        data: data[0]
    })
})
// API ใช้ update ข้อมูล profile
postRouter.put('/profile', async (req,res) => {
    console.log(req.user)
    const updatedProfile = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        date_of_birth: req.body.date_of_birth,
        location: req.body.location,
        city: req.body.city
    }
    const { data, error } = await supabase.from('users').update(updatedProfile).eq('user_id', req.user.id);
    return res.json({
        message: "Updated profile successfully"
    })
})
export default postRouter