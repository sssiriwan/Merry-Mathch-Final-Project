import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { supabase } from "../utils/supabaseClient.js";
import { count } from "console";

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

postRouter.get("/check", async (req, res) => {
  console.log("จาก API GET checkuser", req.user);
  return res.json({
    data: req.user,
  });
});
// API get profile (เทียบ user_id)
postRouter.get("/profile", async (req, res) => {
  console.log("จากprofile", req.user);
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

// API ใช้ update ข้อมูล profile
postRouter.put("/profile", async (req, res) => {
  console.log(req.user);
  const updatedProfile = {
    // username: req.body.username,
    fullname: req.body.fullname,
    // email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    location: req.body.location,
    city: req.body.city,
    sexual_identity: req.body.sexual_identity,
    sexual_preference: req.body.sexual_preference,
    racial_preference: req.body.racial_preference,
    meeting_interest: req.body.meeting_interest,
    about_me: req.body.about_me,
    // hobbies_tag: req.body.hobbies_tag,
  };
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("user_id", req.user.id);
  console.log(data);
  if (error) {
    console.log("อัพเดทโปรไฟล์ไม่สำเร็จ:", error);
  }
  // const { data, error } = await supabase.from('users').update(updatedProfile).eq('user_id', req.user.id);
  return res.json({
    message: "Updated profile successfully",
  });
});
//ดึงข้อมูล จากตาราง merry list แล้วนำมา แมพโดยหามา
//logic เอา status มาเช็คว่าตรงกันไหมแล้วให้ปุ่มแชทขึ้นมา

postRouter.get("/match-list", async (req, res) => {
  console.log("จากprofile", req.user);
  const { data, error } = await supabase
    .from("match_list")
    .select(
      "*,profiles(*, users(email, username, user_id),hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5))"
    )
    .eq("user_id", req.user.id);
  return res.json({
    data: data,
  });
});
//อัพเดต status เมื่อกด unmerry
postRouter.put("/match", async (req, res) => {
  try {
    console.log("จากprofile", req.user);
    console.log(req.body);
    const matchListID= req.body.match_list_id
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
  console.log(req.body.profile_id, "กับ", req.body.status);
  const { data, error } = await supabase.from("match_list").insert([
    {
      user_id: req.user.id,
      profile_id: req.body.profile_id,
      status: req.body.status,
      created_at: new Date(),
    },
  ]);
  console.log(data);
  return res.json({
    message: "Merry! :)",
  });
});

postRouter.post("/unmatch", async (req, res) => {
  console.log(req.body.profile_id, "กับ", req.body.status);
  const { data, error } = await supabase.from("unmatch").insert([
    {
      user_id: req.user.id,
      profile_id: req.body.profile_id,
      created_at: new Date(),
    },
  ]);
  console.log(data);
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
      .eq("profile_id", `%${keyword}%`);
    //   .ilike("profiles_id", `%${keyword}%`);
    return res.json({
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default postRouter;
