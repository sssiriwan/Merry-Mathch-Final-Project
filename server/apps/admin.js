import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { protect } from "../middlewares/protect.js";

const adminRouter = Router();

adminRouter.use(protect);

adminRouter.get("/package", async (req, res) => {
  try {
    if (req.user.role === "Users") {
      return res.json({
        message: "Only Admin can access",
      });
    }
    // console.log(req.user.role)
    const result = await supabase
      .from("merry_packages")
      .select("*")
      .order("package_id", { ascending: true });
    return res.json({
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
});

adminRouter.get("/package/:packageId", async (req, res) => {
  try {
    const result = await supabase
      .from("merry_packages")
      .select("*")
      .eq("package_id", req.params.packageId);
    return res.json({
      data: result.data[0],
    });
  } catch (error) {
    console.log(error);
  }
});

adminRouter.post("/package", async (req, res) => {
  try {
    console.log(req.body);
    const packageItem = {
      package_name: req.body.package_name,
      package_icon: req.body.package_icon,
      package_limit: req.body.package_limit,
      created_at: new Date(),
      admin_id: req.body.admin_id,
      price: req.body.price,
    };
    const result = await supabase.from("merry_packages").insert([
      {
        package_name: packageItem.package_name,
        package_limit: packageItem.package_limit,
        price: packageItem.price,
        created_at: packageItem.created_at,
        // admin_id: packageItem.admin_id,
        package_icon: packageItem.package_icon,
      },
    ]);
    return res.json({
      message: "add package successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

// Admin สามารถดู Complaint Page ได้
adminRouter.get("/complaint", async (req, res) => {
  try {
    if (req.user.role === "Users") {
      return res.json({
        message: "Only Admin can access",
      });
    }
    // console.log(req.user.role)
    const result = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });
    return res.json({
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
});

adminRouter.get('/package/:packageId', async (req,res) => {
  try {
      const result = await supabase.from('merry_packages').select('*').eq('package_id', req.params.packageId);
      return res.json({
          data: result.data[0]
      })
  } catch(error) {
      console.log(error)
  }
})

//admin สาม่ารถเรียกดูคอมเพลนครั้งละ 1 id ได้
adminRouter.get("/complaint/:id", async (req, res) => {
  try {
    const complaintID = req.params.id;
    const result = await supabase
      .from("complaints")
      .select("*, users(*)")
      .eq("complaint_id", complaintID);
    return res.json({
      data: result.data[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//Admin สามารถ Resolve หรือ Cancel Complaint ได้
adminRouter.put("/complaint/:id", async (req, res) => {
  try {
    // Update the complaint status in the database.
    console.log(req.body);
    const complaintID = req.params.id;
    // const currentDate = new Date();
    const updateStatus = {
      complaint_id: req.params.id,
      complaint_status: req.body.status,
      updated_at: new Date(),
    };
    // console.log(typeof updateStatus.updated_at);
    const { data, error } = await supabase
      .from("complaints")
      .update(updateStatus)
      .eq("complaint_id", complaintID);
    return res.json({
      message: "Complaint status updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


//admin สามารถเสริชหาข้อมูลคอมเพลนได้ และกรอง status
adminRouter.get("/complaint", async (req, res) => {
  try {
    const issue = req.query.keywords;
    const status = req.query.complaint_status;
    const query = {};
    if (issue) {
      query.issue = new RegExp(issue, "i");
    }
    if (status) {
      query.status = new RegExp(status, "i");
    }
    const result = await supabase
      .from("complaints")
      .select("*")
      .where(query)
      .order("created_at", { ascending: false });
    return res.json({
      data: result.data,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});


// แก้ไข package
adminRouter.put("/package/:packageId", async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const updatePackage = {
      package_name: req.body.package_name,
      package_limit: req.body.package_limit,
      price: req.body.price,
      // package_icon : req.body.icon,
      // package_detail : req.body.package_detail,
      update_at: new Date(),
    };
    console.log(updatePackage);
    const result = await supabase
      .from("merry_packages")
      .update(updatePackage)
      .eq("package_id", packageId);
    return res.json({
      message: "successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// DELETE package
adminRouter.delete("/package/:packageId", async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const { data, error } = await supabase
      .from("merry_packages")
      .delete()
      .eq("package_id", packageId);

    if (error) {
      console.error("Error deleting package:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }

    // if (!data || data.length === 0) {
    //     return res.status(404).json({
    //         message: "Package not found",
    //     });
    // }

    return res.json({
      message: "Package has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export default adminRouter;
