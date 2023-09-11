import express from "express";
import authRouter from "./apps/auth.js";
import cors from "cors"
import bodyParser from "body-parser";
import adminRouter from "./apps/admin.js";
import postRouter from "./apps/posts.js";

async function init() {
    
  const app = express();
  const port = 4000;

  app.use(cors())
  app.use(bodyParser.json())

  app.use("/auth", authRouter);
  app.use('/admin', adminRouter)
  app.use('/post', postRouter )

  app.get("/", (req,res) => {
    res.send("hi sawasdee")
  });

  app.get("*", (req,res) => {
    res.status(404).send("Not found")
  })
  

  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
}

init();
