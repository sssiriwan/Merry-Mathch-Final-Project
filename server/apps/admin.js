import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const adminRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const iconUpload = upload.fields([{name: "icon", maxCount:1 }]);

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
      .select("* , package_detail(detail_1, detail_2)")
      .eq("package_id", req.params.packageId);
    return res.json({
      data: result.data[0],
    });
  } catch (error) {
    console.log(error);
  }
});

adminRouter.post("/package", iconUpload , async (req, res) => {
  try {
    const files = req.files.icon;
    let fileUrl;
    for(let i=0; i<files.length; i++) {
      const fileName = `${Date.now()}`
      const { data, error } = await supabase.storage.from('packageIcon').upload( fileName, files[i].buffer , {
        cacheControl: '3600',
        upsert: false,
        contentType: files[i].mimetype
      })
      const result = supabase.storage.from('packageIcon').getPublicUrl(data.path)
      fileUrl = result.data.publicUrl;
      if(error) {
        console.log(error)
      }
    }
    const detailArr = req.body.detail
    const response = await supabase.from('package_detail').insert([{detail_1: detailArr[0], detail_2: detailArr[1], detail_3: detailArr[2], detail_4: detailArr[3], detail_5: detailArr[4]}]).select()
    const packageItem = {
      package_name: req.body.package_name,
      package_icon: fileUrl,
      package_limit: req.body.package_limit,
      created_at: new Date(),
      admin_id: req.user.id,
      price: req.body.price,
      detail_id: response.data[0].detail_id
    };
    console.log(response)
    const result = await supabase.from("merry_packages").insert([packageItem]);
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
adminRouter.get("/complaintz", async (req, res) => {
  try {
    const issue = req.query.keywords;
    const status = req.query.status;
    console.log(issue.length, "กับ", status);

    if (status && status != 'All') {
      const result = await supabase
        .from("complaints")
        .select("*")
        .or(`complaint_status.ilike.%${status}%`)
        .order("created_at", { ascending: false });
      return res.json({
        data: result.data,
      });
    }

    if (issue) {
      const result = await supabase
        .from("complaints")
        .select("*")
        .or(`issue.ilike.%${issue}%`) 
        .order("created_at", { ascending: false });
      // if(result.data.length == 0) {
      //   console.log("ไม่มีข้อมูล")
      // }
      return res.json({
        data: result.data,
      });
    }

    if (status == 'All') { // || status.length == 0
      const result = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });
      return res.json({
        data: result.data,
      });
    }

    const result = await supabase
      .from("complaints")
      .select("*")
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
adminRouter.put("/package/:packageId", iconUpload , async (req, res) => {
  try {
    let fileUrl;
    if(req.files.icon != undefined) {
      const files = req.files.icon
      for (let i=0; i<files.length; i++) {
        const fileName = `${Date.now()}`;
        const { data, error } = await supabase.storage.from('packageIcon').upload( fileName, files[i].buffer, {
          cacheControl: 3600,
          upsert: false,
          contentType: files[i].mimetype
        })
        const result = supabase.storage.from('packageIcon').getPublicUrl(data.path);
        fileUrl = result.data.publicUrl
        if(error) {
          console.log(error)
        }
      }
    }
    const detailArr = req.body.detail
    const packageId = req.params.packageId;
    const updatePackage = {
      package_name: req.body.package_name,
      package_limit: req.body.package_limit,
      price: req.body.price,
      admin_id: req.user.id,
      update_at: new Date(),
    };
    if (req.body.icon) {
      updatePackage.package_icon = req.body.icon
    } else {
      updatePackage.package_icon = fileUrl
    }
    const result = await supabase
      .from("merry_packages")
      .update(updatePackage)
      .eq("package_id", packageId).select();
    const response = await supabase.from('package_detail').update({detail_1: detailArr[0], detail_2: detailArr[1], detail_3: detailArr[2], detail_4: detailArr[3], detail_5: detailArr[4]}).eq('detail_id', result.data[0].detail_id).select()
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
