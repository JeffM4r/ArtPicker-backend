import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";

import { loadEnv } from "./config/env.js";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json({limit: '60mb'}))
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  

export default app;