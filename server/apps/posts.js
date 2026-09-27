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

  console.log(req.query);
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
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*, users(email, username), hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5)"
      )
      .eq("user_id", req.user.id)
      .single();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

postRouter.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*,hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1,img_2,img_3,img_4,img_5)"
      )
      .eq("user_id", userId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const AVATAR_SLOTS = ["img_1", "img_2", "img_3", "img_4", "img_5"];
const AVATAR_BUCKET = "avatarImg";
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

// แปลง public URL ของ supabase storage ให้เป็น path ภายใน bucket เพื่อใช้ลบไฟล์
const toStoragePath = (publicUrl) => {
  if (typeof publicUrl !== "string" || publicUrl.length === 0) {
    return null;
  }
  const marker = `/storage/v1/object/public/${AVATAR_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) {
    return null;
  }
  return publicUrl.slice(idx + marker.length);
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatars" && !ACCEPTED_AVATAR_TYPES.includes(file.mimetype)) {
      return cb(new Error("รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, WEBP, GIF)"));
    }
    return cb(null, true);
  },
  limits: { fileSize: MAX_AVATAR_SIZE, files: 5 },
});
const avatarUpload = upload.fields([
  { name: "avatars", maxCount: 5 },
  { name: "tags", maxCount: 10 },
]);
// API ใช้ update ข้อมูล profile
postRouter.put("/profile", avatarUpload, async (req, res) => {
  try {
  const files = req.files.avatars;
  const fileUrl = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const fileName = `${Date.now()}-${i}`;
      const { data, error } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(fileName, files[i].buffer, {
          cacheControl: 3600,
          upsert: false,
          contentType: files[i].mimetype,
        });
      if (error) {
        console.log("อัปโหลดรูปไม่สำเร็จ:", error);
        continue;
      }
      const result = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(data.path);
      fileUrl.push(result.data.publicUrl);
    }
  }
  const updatedProfile = {
    fullname: req.body.fullname,
    date_of_birth: req.body.date_of_birth,
    location: req.body.location,
    city: req.body.city,
    sexual_identity: req.body.sexual_identity,
    sexual_preference: req.body.sexual_preference,
    racial_preference: req.body.racial_preference,
    meeting_interest: req.body.meeting_interest,
    about_me: req.body.about_me,
  };

  const updatedUser = {};
  if (req.body.username) updatedUser.username = req.body.username;
  if (req.body.email) updatedUser.email = req.body.email;

  if (Object.keys(updatedUser).length > 0) {
    const userUpdate = await supabase
      .from("users")
      .update(updatedUser)
      .eq("user_id", req.user.id);
    if (userUpdate.error) {
      console.log("อัพเดท user ไม่สำเร็จ:", userUpdate.error);
    }
  }
  let hobbies = req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags]).filter((word) => word != "null") : [];
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

  // ซิงก์รูปโปรไฟล์: รักษาลำดับตามที่ client ส่งมา และลบเฉพาะรูปที่ถูกเอาออกจริง
  if ("image_order" in req.body) {
    const currentRes = await supabase
      .from("profile_image")
      .select(AVATAR_SLOTS.join(","))
      .eq("user_id", req.user.id)
      .maybeSingle();
    const currentRow = currentRes.data || {};
    const currentUrls = AVATAR_SLOTS.map((slot) => currentRow[slot]).filter(
      (url) => typeof url === "string" && url.length > 0
    );

    // image_order = [{ type: "keep", url }, { type: "new", index }, ...]
    let order = [];
    try {
      order = JSON.parse(req.body.image_order || "[]");
    } catch (parseError) {
      console.log("รูปแบบ image_order ไม่ถูกต้อง:", parseError);
    }
    if (!Array.isArray(order)) {
      order = [];
    }

    const nextUrls = new Array(AVATAR_SLOTS.length).fill(null);
    const usedNewFiles = new Set();
    order.slice(0, AVATAR_SLOTS.length).forEach((entry, position) => {
      if (entry && entry.type === "keep" && typeof entry.url === "string" && entry.url.length > 0) {
        nextUrls[position] = entry.url;
      } else if (entry && entry.type === "new" && Number.isInteger(entry.index)) {
        const uploaded = fileUrl[entry.index];
        if (uploaded) {
          nextUrls[position] = uploaded;
          usedNewFiles.add(entry.index);
        }
      }
    });

    // ไฟล์ใหม่ที่ client ไม่ได้ระบุตำแหน่ง ให้เก็บต่อท้ายตามลำดับ
    fileUrl.forEach((url, index) => {
      if (usedNewFiles.has(index)) {
        return;
      }
      const freeSlot = nextUrls.indexOf(null);
      if (freeSlot !== -1) {
        nextUrls[freeSlot] = url;
      }
    });

    const updatePayload = {};
    AVATAR_SLOTS.forEach((slot, index) => {
      updatePayload[slot] = nextUrls[index];
    });

    const userImg = currentRes.data
      ? await supabase
          .from("profile_image")
          .update(updatePayload)
          .eq("user_id", req.user.id)
          .select()
      : await supabase
          .from("profile_image")
          .insert([{ user_id: req.user.id, ...updatePayload }])
          .select();

    if (userImg.error) {
      console.log("อัพเดทรูปโปรไฟล์ไม่สำเร็จ:", userImg.error);
    }

    // ลบไฟล์รูปเก่าที่ถูกถอดออกจากโปรไฟล์ออกจาก storage ด้วย
    const keptUrls = new Set(nextUrls.filter(Boolean));
    const removedPaths = currentUrls
      .filter((url) => !keptUrls.has(url))
      .map(toStoragePath)
      .filter(Boolean);

    if (removedPaths.length > 0) {
      const { error: removeError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .remove(removedPaths);
      if (removeError) {
        console.log("ลบไฟล์รูปเก่าไม่สำเร็จ:", removeError);
      }
    }
  }
  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("user_id", req.user.id);
  console.log(data);
  if (error) {
    console.log("อัพเดทโปรไฟล์ไม่สำเร็จ:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.json({
    message: "Updated profile successfully",
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
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
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
});
export default postRouter;
