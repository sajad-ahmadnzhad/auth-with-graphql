import { createClient } from "redis";

const productionMode = process.env.NODE_ENV == "production";
const redisUri = productionMode ? undefined : process.env.REDIS_URI;

export default (async () => {
  return await createClient({ url: redisUri })
    .on("error", (error) => console.log("connect to redis error => ", error))
    .connect();
})();
