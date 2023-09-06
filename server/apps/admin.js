import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const adminRouter = Router();

adminRouter.get('/package', async (req,res) => {
    try {
        const result = await supabase.from('package_list').select('*');
        return res.json({
            data: result.data,
        })
    } catch (error) {
        console.log(error)
    }
})

adminRouter.get('/package/:packageId', async (req,res) => {
    try {
        const result = await supabase.from('package_list').select('*').eq('id', req.params.packageId);
        return res.json({
            data: result.data[0]
        })
    } catch(error) {
        console.log(error)
    }
})

adminRouter.post('/package', async (req,res) => {
    try {
        const packageItem = {
            package_name: req.body.package_name,
            merry_limit: req.body.merry_limit,
            created_at: new Date(),
            admin_id: req.body.admin_id,
        }
        await supabase.from('package_list').insert([{
            package_name: packageItem.package_name,
            merry_limit: packageItem.merry_limit,
            created_at: packageItem.created_at,
            admin_id: packageItem.admin_id,
        }])
        return res.json({
            message: "add package successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

export default adminRouter