const jwt = require("jsonwebtoken");

module.exports = getDriverId = (token) => {
  const decoded = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  var userId = decoded.driverId;
  const driverId = userId;
  return driverId;
};
