exports.setUp = function (app) {
  const userRoute = require("../route/user.route");

  app.use("/api/v1/user", userRoute);
};

module.exports = exports;
