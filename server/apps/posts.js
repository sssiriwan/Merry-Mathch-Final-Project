import { Router } from "express";
import { protect } from "../middlewares/protect.js";

const postRouter = Router();
postRouter.use(protect);

postRouter.get('/', async (req,res) => {
    console.log(req.user)
    return res.json({
        data: req.user
    })
})

export default postRouter