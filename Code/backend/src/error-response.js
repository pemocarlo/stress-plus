/**
 * @param {import("express").Response} res response
 * @param {number} status http status code
 * @param {string} message custom error message
 */
export function sendErrorResponse(res, status, message) {
  res.status(status).json(getErrorObject(status, message));
}

function getErrorObject(status, message) {
  return {
    error: {
      status: status,
      message: message,
    },
  };
}
