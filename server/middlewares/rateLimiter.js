import redisClient from "../db/setRedisClient.js";
import moment from "moment/moment.js";

const RATELIMIT_DURATION_IN_SECONDS = 60;
const NUMBER_OF_REQUEST_ALLOWED = 5;
const EXPIRATION_TIME_IN_SECONDS = 600; 

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(",")[0]
    : req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  return ip;
};

export default async function rateLimiter(req, res, next) {
  const kufiya_id = getClientIp(req);
  const currentTime = moment().unix();

  try {
    const result = await redisClient.hGetAll(kufiya_id);
    if (Object.keys(result).length === 0) {
      await redisClient.hSet(kufiya_id, {
        createdAt: currentTime,
        count: 1,
      });

      await redisClient.expire(kufiya_id, EXPIRATION_TIME_IN_SECONDS);
      return next();
    }
    if (result) {
      let diff = currentTime - result["createdAt"];

      if (diff > RATELIMIT_DURATION_IN_SECONDS) {
        await redisClient.hSet(kufiya_id, {
          createdAt: currentTime,
          count: 1,
        });
        await redisClient.expire(kufiya_id, EXPIRATION_TIME_IN_SECONDS);
        return next();
      }
    }
    if (result["count"] >= NUMBER_OF_REQUEST_ALLOWED) {
      return res.status(429).json({
        success: false,
        message: "user-ratelimited",
      });
    } else {
      await redisClient.hSet(kufiya_id, {
        count: parseInt(result["count"]) + 1,
      });
      await redisClient.expire(kufiya_id, EXPIRATION_TIME_IN_SECONDS);
      return next();
    }
  } catch (err) {
    console.error("Error in rate limiter middleware:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
