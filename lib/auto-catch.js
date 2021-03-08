module.exports = autoCatch;

const catchHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

function autoCatch(handler) {
  if (typeof handler === "function") {
    return catchHandler(handler);
  } else if (typeof handler === "object") {
    return Object.entries(handler).reduce((accumulator, [name, fn]) => {
      accumulator[name] = catchHandler(fn);
      return accumulator;
    }, {});
  }
  // return handler;
}
