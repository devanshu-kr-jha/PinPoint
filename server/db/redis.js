import redisClient from "./setRedisClient.js";
export default async function connectRedis() {
  await redisClient.connect();
  console.log("Connected to Redis server");
}

