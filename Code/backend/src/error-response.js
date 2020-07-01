export default function sendErrorResponse(res, status, message) {
  res.json(getErrorObject(status, message));
}

function getErrorObject(status, message) {
  return {
    error: {
      status: status,
      message: message,
    },
  };
}
