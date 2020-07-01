import bodyParser from "body-parser";
import express from "express";

import enforceHttps from "./enforce-https";
import sendErrorResponse from "./error-response";
import stressTestRoutes from "./stress-test/stress-test-routes";

const PORT = process.env.PORT || 80;
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const app = express();

app.use(bodyParser.json());
if (!IS_DEVELOPMENT) {
  app.use(enforceHttps);
}

app.get("/", (req, res) => {
  if (req.secure) {
    res.send("Hello secure Stress+");
  } else {
    res.send(`Hello Stress+`);
  }
});

app.use("/api/stress-test", stressTestRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, _, res, next) => sendErrorResponse(res, 500, err.message));

// assume 404
app.use((_, res) => sendErrorResponse(res, 404, "Not found"));

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
