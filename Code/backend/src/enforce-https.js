// Inspired by this file https://github.com/florianheinemann/express-sslify/blob/8a56114fee9306ded42b9bf33d2cf99050c8fb07/index.js
/*
 * This enforces HTTPS connections on any incomming GET and HEAD requests. It will redirect those
 * requrests with 301 permanent redirect. Any other requests will be fail with 403 forbidden.
 * This will also work behind reverse proxies or load balancers which act as an SSL endpoint
 * but then forward unencrypted HTTP traffic. Those reverse proxies often set the
 * 'x-forwarded-proto' and 'x-forwarded-host' header parameter with the original request scheme.
 * This middleware will respect these header parameters and considers a HTTP request as secure
 * if the 'x-forwarded-proto' has value of 'https'
 */
export default function enforceHttps(req, res, next) {
  if (req.secure || (req.headers["x-forwarded-proto"] || "").substring(0, 5) === "https") {
    next();
  } else {
    if (req.method === "GET" || req.method === "HEAD") {
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      res.redirect(301, `https://${host}${req.originalUrl}`);
    } else {
      res.status(403).send("Please use HTTPS.");
    }
  }
}
