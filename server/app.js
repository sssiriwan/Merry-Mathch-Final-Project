import express from "express";
import authRouter from "./apps/auth.js";
//db.pauqbkgvjpahoowveuka.supabase.co

async function init() {
    
  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/auth", authRouter);

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
