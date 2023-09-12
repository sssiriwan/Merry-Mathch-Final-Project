import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { supabase } from "../utils/supabaseClient.js";

const postRouter = Router();
postRouter.use(protect);

postRouter.get('/', async (req,res) => {
    // const sexual_preference = req.query.sex;
    // if(sexual_preference) {
    //     const result = await supabase.from('users').select('*').eq('role', 'Users').eq('sexual_identity', sexual_preference)
    //     return res.json({
    //         result: result,
    //     })
    // }
    
    if(req.user.role === 'Admin') {
        return res.json({
            message: "You are admin"
        })
    }
    const result = await supabase.from('users').select('*').eq('role', 'Users');
    return res.json({
        data: req.user,
        result: result,
    })
})

postRouter.post('/', async (req,res) => {
    const checkHeart = await supabase.from('match').select('*').eq('user_id', req.body.user_id);
    if(checkHeart) {
        return res.json({
            message: "You already liked this person"
        })
    }
    const {data, error} = await supabase.from('match').insert([{
        created_at: new Date(),
        user_id: req.body.user_id
    }])

    if(error) {
        console.log(error)
    }
})

export default postRouter