import express from "express";

import {initDatabase} from "./database";
import {initRoutes} from "./routes";

const PORT = process.env.PORT || 80;

const app = express();
app.disable("x-powered-by");
app.set("json spaces", 2); //Enables pretty printing json responses

Promise.all([initDatabase(), initRoutes(app)])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Stress+ API is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to start server`);
    console.error(err);
  });
