import bodyParser from "body-parser";

import enforceHttps from "./enforce-https";
import sendErrorResponse from "./error-response";
import stressTestRoutes from "./stress-test/stress-test-routes";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export async function initRoutes(app) {
  app.use(bodyParser.json());
  if (!IS_DEVELOPMENT) {
    app.use(enforceHttps);
  }

  app.use("/api/stress-test", stressTestRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use((err, _, res, next) => sendErrorResponse(res, 500, err.message));

  // assume 404
  app.use((_, res) => sendErrorResponse(res, 404, "Not found"));
}
