const errorhandler = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal server error";
  res.status(statuscode).json({
    success: false,
    message,
  });
};

module.exports = errorhandler;
