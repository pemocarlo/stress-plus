// This is inspired by https://github.com/Abazhenov/express-async-handler/blob/ccd9b5b9b0bbe853ec3374cb76ee0d7b81b736a3/index.js
/**
 * This is a simple express middleware for handling exceptions inside of async express routes.
 * The exceptions are passed to the express error handler.
 * @param {*} handler async express handler function
 */
export const asyncHandler = (handler) => {
  function wrapper(...args) {
    const handlerResult = handler(...args);
    const next = args[args.length - 1];
    return Promise.resolve(handlerResult).catch(next);
  }
  return wrapper;
};
