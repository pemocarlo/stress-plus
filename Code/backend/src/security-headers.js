const CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' data: https://fonts.gstatic.com; " +
  "img-src 'self' data:; " +
  "frame-src *;";

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 * @param * next callback
 */
export default function securityHeaders(_, res, next) {
  res.setHeader("Content-Security-Policy", CSP);
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("Strict-Transport-Security", "max-age=31557600");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
}
