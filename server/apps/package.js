import { Router } from "express";
import {supabase} from "../utils/supabaseClient.js"

const adminRouter = Router();

// adminRouter.get("/package", async (req, res) => {});

adminRouter.post("/package", async (req, res) => {
  try {
    const packageItem = {
     
      package_name: req.body.package_name,
      package_limit: req.body.package_limit,
      price: req.body.price,
      // created_at: new Date(),
      // update_at: new Date(),
    };

    await supabase
    .from("merry_packages").insert([
      {
        
        package_name: packageItem.package_name,
        package_limit: packageItem.package_limit,
        price: packageItem.price,
        // created_at: packageItem.created_at,
        // update_at: packageItem.update_at,
      },
    ]);
    return res.json({
      message: "add package successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export default adminRouter;
