import { Router } from "express";
import { protect } from "../middlewares/protect";
import { supabase } from "../utils/supabaseClient.js";

const complaintRouter = Router();

// complaintRouter.use(protect);

//User สามารถสร้าง Complain ได้
complaintRouter.post('/complaint', async (req, res) => {
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
  
  // Admin สามารถดู Complaint Page ได้
  complaintRouter.get('/complaint', async (req,res) => {
      try {
          if(req.user.role === 'Users') {
              return res.json({
                  message: "Only Admin can access"
              })
          }
          console.log(req.user.role)
          const result = await supabase.from('complaints').select('*').order('complaint_id', {ascending: true});
          return res.json({
              data: result.data,
          })
      } catch (error) {
          console.log(error)
      }
  })
  //Admin สามารถ Resolve หรือ Cancel Complaint ได้
//   UPDATE MATCHING ROWS
// const { data, error } = await supabase
//   .from('complaints')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()


export default complaintRouter;


