import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { supabase } from "../utils/supabaseClient.js";
import multer from "multer";

const postRouter = Router();
postRouter.use(protect);

postRouter.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_image(img_1,img_2,img_3,img_4,img_5)");
  return res.json({
    data: data,
  });
});

postRouter.get("/filter", async (req, res) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  // หาวันเดือนปีเกิดของผู้ใช้
  const userDateMax = `${todayYear - req.query.max}-${todayMonth}-${todayDay}`;
  const userDateMin = `${todayYear - req.query.min}-${todayMonth}-${todayDay}`;

  if (req.query.keyword) { //const {data} = await supabase.from('hobbies').select('*').or(`hob_1.ilike.%modeling%`)
    const { data, error } = await supabase
      .from("profiles")
      .select("* , profile_image(img_1,img_2,img_3,img_4,img_5), hobbies!inner(*)")
      .or(`hob_1.ilike.%${req.query.keyword}%, hob_2.ilike.%${req.query.keyword}%,hob_3.ilike.%${req.query.keyword}%,hob_4.ilike.%${req.query.keyword}%,hob_5.ilike.%${req.query.keyword}%`, {foreignTable: 'hobbies'})
      .gte("date_of_birth", userDateMax)
      .lte("date_of_birth", userDateMin)
      .neq("user_id", req.user.id);
    return res.json({
      data: data,
    });
  }
  // check เพศ
  
  if (req.query.male == "true") {
    const { data, error } = await supabase
      .from("profiles")
      .select("* , profile_image(img_1,img_2,img_3,img_4,img_5) ")
      .eq("sexual_identity", "Male")
      .gte("date_of_birth", userDateMax)
      .lte("date_of_birth", userDateMin)
      .neq("user_id", req.user.id);
    return res.json({
      data: data,
    });
  }
  if (req.query.female == "true") {
    const { data, error } = await supabase
      .from("profiles")
      .select("* , profile_image(img_1,img_2,img_3,img_4,img_5) ")
      .eq("sexual_identity", "Female")
      .gte("date_of_birth", userDateMax)
      .lte("date_of_birth", userDateMin)
      .neq("user_id", req.user.id);
    return res.json({
      data: data,
    });
  }
  if (req.query.bi == "true") {
    const { data, error } = await supabase
      .from("profiles")
      .select("* , profile_image(img_1,img_2,img_3,img_4,img_5) ")
      .eq("sexual_identity", "Non-Binary")
      .gte("date_of_birth", userDateMax)
      .lte("date_of_birth", userDateMin)
      .neq("user_id", req.user.id);
    console.log("ค้นหา bi", data);
    return res.json({
      data: data,
    });
  }

  // console.log(req.query);
  const { data, error } = await supabase
    .from("profiles")
    .select("* , profile_image(img_1,img_2,img_3,img_4,img_5) ")
    .gte("date_of_birth", userDateMax)
    .lte("date_of_birth", userDateMin)
    .neq("user_id", req.user.id);
  return res.json({
    data: data,
  });
});

postRouter.get("/check", async (req, res) => {
  return res.json({
    data: req.user,
  });
});

// API get profile (เทียบ user_id)
postRouter.get("/profile", async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "*, users(email, username), hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5)"
    )
    .eq("user_id", req.user.id)
    .single();
  return res.json({
    data: data,
  });
});

postRouter.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "*,hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1,img_2,img_3,img_4,img_5)"
    )
    .eq("user_id", userId);
  return res.json({
    data: data[0],
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const avatarUpload = upload.fields([
  { name: "avatars", maxCount: 5 },
  { name: "tags", maxCount: 10 },
]);
// API ใช้ update ข้อมูล profile
postRouter.put("/profile", avatarUpload, async (req, res) => {
  let fileUrl = [];
  const files = req.files.avatars;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const fileName = `${Date.now()}`;
      const { data, error } = await supabase.storage
        .from("avatarImg")
        .upload(fileName, files[i].buffer, {
          cacheControl: 3600,
          upsert: false,
          contentType: files[i].mimetype,
        });
      const result = supabase.storage.from("avatarImg").getPublicUrl(data.path);
      fileUrl.push(result.data.publicUrl);
      if (error) {
        console.log(error);
      }
    }
  }
  const updatedProfile = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    location: req.body.location,
    city: req.body.city,
    sexual_identity: req.body.sexual_identity,
    sexual_preference: req.body.sexual_preference,
    racial_preference: req.body.racial_preference,
    meeting_interest: req.body.meeting_interest,
    about_me: req.body.about_me,
  };
  let hobbies = req.body.tags.filter((word) => word != "null");
  const userHobbies = await supabase
    .from("hobbies")
    .update({
      hob_1: hobbies[0],
      hob_2: hobbies[1],
      hob_3: hobbies[2],
      hob_4: hobbies[3],
      hob_5: hobbies[4],
      hob_6: hobbies[5],
      hob_7: hobbies[6],
      hob_8: hobbies[7],
      hob_9: hobbies[8],
      hob_10: hobbies[9],
    })
    .eq("user_id", req.user.id)
    .select();

  const userImg = await supabase
    .from("profile_image")
    .update({
      img_1: fileUrl[4],
      img_2: fileUrl[3],
      img_3: fileUrl[2],
      img_4: fileUrl[1],
      img_5: fileUrl[0],
    })
    .eq("user_id", req.user.id)
    .select();
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("user_id", req.user.id);
  console.log(data);
  if (error) {
    console.log("อัพเดทโปรไฟล์ไม่สำเร็จ:", error);
  }

  return res.json({
    message: "Updated profile successfully",
  });
});
//ดึงข้อมูล จากตาราง merry list แล้วนำมา แมพโดยหามา
//logic เอา status มาเช็คว่าตรงกันไหมแล้วให้ปุ่มแชทขึ้นมา

postRouter.get("/match-list", async (req, res) => {
  const { data, error } = await supabase
    .from("match_list")
    .select("*")
    .or(`chooser.eq.${req.user.id},chosen_one.eq.${req.user.id}`);
  return res.json({
    data: data,
  });
});

//อัพเดต status เมื่อกด unmerry
postRouter.put("/match", async (req, res) => {
  try {
    const matchListID = req.body.match_list_id;
    const updateStatus = {
      match_list_id: req.body.match_list_id,
      status: req.body.status,
      updated_at: new Date(),
    };
    const { data, error } = await supabase
      .from("match_list")
      .update(updateStatus)
      .eq("match_list_id", matchListID);
    return res.json({
      message: "Match status updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

postRouter.post("/match", async (req, res) => {
  const { data, error } = await supabase.from("match_list").insert([
    {
      chooser: req.user.id,
      chosen_one: req.body.chosen_one,
      status: req.body.status,
      created_at: new Date(),
    },
  ]);
  return res.json({
    message: "Merry! :)",
  });
});

postRouter.post("/unmatch", async (req, res) => {
  const { data, error } = await supabase.from("unmatch").insert([
    {
      chooser: req.user.id,
      unchosen_one: req.body.user_id,
      profile_id: req.body.profile_id,
      created_at: new Date(),
    },
  ]);
  return res.json({
    message: "Unmerry! :(",
  });
});

postRouter.get("/keyword", async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*, users(email, username), hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5)"
      )
      .eq("issue", `${keyword}`);
    return res.json({
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

postRouter.get("/membership", async (req, res) => {
  console.log(req.user.id);
  try {
    const result = await supabase
      .from("purchase")
      .select(
        "*, merry_packages(package_name, price, package_limit, package_icon)"
      )
      .eq("user_id", req.user.id);

    return res.json({
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

postRouter.delete("/membership", async (req, res) => {
  console.log(req.user.id);
  try {
    const result = await supabase
      .from("purchase")
      .delete()
      .eq("user_id", req.user.id);

    return res.json({
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
});

postRouter.post("/purchase", async (req, res) => {
  try {
    console.log(req.body)
    const userPayment = {
      package_id: req.body.packageId,
      user_id: req.user.id
    };
    const { data } = await supabase.from('purchase').insert([userPayment])
    return res.json({
      message: "ซื้อแล้วจ้าเย้"
    })
  } catch(error) {
    console.log(error)
  }
});
export default postRouter;
