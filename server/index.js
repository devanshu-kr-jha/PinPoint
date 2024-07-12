import express from "express";
import connectRedis from "./db/redis.js";
import connectMongo from "./db/connection.js";
import { config } from "dotenv";
import router from "./router/route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: [
      "http://react-frontend",
      "http://localhost",
      'http://localhost:80'
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const initializeServer = async () => {
  try {
    await connectRedis();
    await connectMongo();

    app.listen(port, () => {
      console.log(`[SUCCESS]: Server Up`);
    });
  } catch (err) {
    console.log(err);
  }
};
initializeServer();

app.use("/api", router);

app.get("/", (req, res) => {
  try {
    res.json("Serevr Up and Running!!");
  } catch (error) {
    console.log({ error });
  }
});
