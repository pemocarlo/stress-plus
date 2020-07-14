import path from "path";

import bodyParser from "body-parser";
import staticCompression from "express-static-gzip";

import enforceHttps from "./enforce-https";
import {sendErrorResponse} from "./error-response";
import securityHeaders from "./security-headers";
import statsRoutes from "./stress-test/stats-routes";
import stressTestRoutes from "./stress-test/stress-test-routes";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * @param {import("express").Express} app Express app
 */
export async function initRoutes(app) {
  app.use(bodyParser.json());
  if (IS_PRODUCTION) {
    app.use(enforceHttps);
  }

  app.use("/api/stress-test", stressTestRoutes);
  app.use("/api/stats", statsRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use((err, _, res, next) => sendErrorResponse(res, 500, err.message));

  // assume 404 for all other requests on /api
  app.use("/api", (_, res) => sendErrorResponse(res, 404, "Endpoint not found"));

  if (IS_PRODUCTION) {
    app.use(securityHeaders);
  }

  // staticCompression is a wrapper around serve-static to serve precompressed files
  app.use(
    staticCompression(`${__dirname}/www`, {
      enableBrotli: true,
      index: false,
      orderPreference: ["br"],
      // Disable cache control header for now: see https://create-react-app.dev/docs/production-build
      // on how to set Cache control header for a create react app properly
      serveStatic: {cacheControl: false},
    })
  );
  app.get("*", (_, res) => res.sendFile(path.resolve(__dirname, "www/index.html")));
}
