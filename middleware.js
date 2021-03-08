module.exports = {
  handleError,
  notFound,
};

function handleError(err, req, res, next) {
  if (err.name === "ValidationError") {
    const error = [];
    Object.keys(err.errors).forEach((key) => {
      error.push(err.errors[key].message);
    });
    return res.status(400).json({ error: error });
  }
  if (err.statusCode) {
    // handled error;
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: "internal error" });
}

function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}
