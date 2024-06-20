import Session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../db/setRedisClient.js";

const sessionMiddleware = Session({
  name: "authentication_system",
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: "mysecret",
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 10 * 1000, // 10 minutes
  },
});

export default sessionMiddleware;
