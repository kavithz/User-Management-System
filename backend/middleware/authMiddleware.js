const jwt = require("jsonwebtoken");
require("dotenv").config();

// Protects routes by requiring a valid JWT in the Authorization header:
// "Authorization: Bearer <token>"
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Access denied." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // available to the next route handler as req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;
