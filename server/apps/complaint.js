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
complaintRouter.put('/complaint', async (req, res) => {
  const { issue, description, status, updatedStatus } = req.body;

  try {
    // Update the complaint status in the database.
    await supabase.from('complaints')
      .update({ complaint_status: updatedStatus.complaint_status })
      .eq('complaint_id', complaint_id)
      .select();

    res.status(200).send('Complaint status updated successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});


complaintRouter.put('/complaint',async (req, res) => {
  const complaintId = req.body.complaint_id;
  // console.log(req.body);

  const updatedStatus = {
    ...req.body,
    // updated_at: new Date(),
  };
//   UPDATE MATCHING ROWS
// const { data, error } = await supabase
//   .from('complaints')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()
  await supabase.from('complaints')
  (
    ` UPDATE complaints
    SET complaint_status = $2 ,updated_at = $3
    WHERE complaint_id=  $1`,
    [complaintId, updatedStatus.complaint_status, updatedStatus.updated_at]
  );
  // console.log("success");
  console.log(`Status ${complaintId} has been updated.`);
  return res.json({
    message: `Status ${complaintId} has been updated.`,
  });
});


export default complaintRouter;




complaintRouter.put('/complaint',async (req, res) => {
  const { complaint_id, updatedStatus } = req.body;

  const complainItem = {
    complaint_status: updatedStatus.complaint_status,
    updated_at: new Date(),
  };

  const { data, error } = await supabase
    .from('complaints')
    .update(complainItem)
    .eq('complaint_id', complaint_id);

  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(data);
  }
});


productRouter.get("/", async (req, res) => {
  try {
    const issue = req.query.keywords;
    const status = req.query.status;
    const query = {};
    if (issue) {
      query.issue = new RegExp(issue, "i");
    }
    if (status) {
      query.status = new RegExp(status, "i");
    }
    const result = await supabase.from('complaints').select('*').where(query).order('created_at', { ascending: false });
return res.json({
  data: result.data,
});
    
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});