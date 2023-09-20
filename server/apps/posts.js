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
    const {data, error} = await supabase.from('profiles').select('*, users(*), profile_image(img_1, img_2, img_3, img_4, img_5), hobbies(*)').eq('user_id', req.user.id).single();
    return res.json({
        data: data,
    })
})

postRouter.get('/profile/:userId', async (req,res) => {
    const userId = req.params.userId;
    const { data, error } = await supabase.from('users').select("*, profile_image(*), hobbies(*)").eq('user_id', userId)
    return res.json({
        data: data[0],
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
        city: req.body.city,
        sexual_identity: req.body.sexual_identity,
        sexual_preference: req.body.sexual_preference,
        racial_preference: req.body.racial_preference,
        meeting_interest: req.body.meeting_interest,
        about_me: req.body.about_me,
        hobbies_tag: req.body.hobbies_tag,
    }
    const { data, error } = await supabase.from('users').update(updatedProfile).eq('user_id', req.user.id);
    return res.json({
        message: "Updated profile successfully"
    })
})

postRouter.get('/match-list', async (req,res) => {
    console.log(req.user)
    const { data, error } = await supabase.from('users').select('*').eq('role', 'Users');
    return res.json({
        data: data
    })
})
export default postRouter