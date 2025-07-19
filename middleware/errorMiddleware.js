// Handles requests for routes that don't exist (404 Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// The global error handler that catches all errors
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200 (OK), it means an error occurred
  // in an unexpected place, so we default to 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send back a clean JSON response
  res.json({
    message: err.message,
    // Show the error stack trace only if we are not in production for security
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export { notFound, errorHandler };
