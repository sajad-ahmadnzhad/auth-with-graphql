import { createClient } from "redis";

export default (async () => {
  return await createClient()
    .on("error", (error) => console.log("connect to redis error => ", error))
    .connect();
})();
