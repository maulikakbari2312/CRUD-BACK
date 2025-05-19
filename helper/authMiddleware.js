const { verifyToken } = require("./jwtToken.js");
const logger = require("./logger.js");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("authorization");
    console.log("Raw Authorization header:", authHeader);

    const tokenString = authHeader?.replace(/bearer\s*/i, "").trim();
    const token = { token: tokenString };

    if (!token.token) {
      throw {
        type: "TOKEN_NOT_FOUND",
        statusCode: 401,
        message: "Authentication token is required",
      };
    }

    const rootUser = await verifyToken(token);

    if (!rootUser) {
      throw {
        type: "INVALID_TOKEN",
        statusCode: 401,
        message: "Invalid authentication token",
      };
    }

    logger.info("User authenticated successfully");
    req.user = rootUser;
    next();
  } catch (error) {
    if (error.type) {
      logger.error(`Authentication failed: ${error.message}`);
      return res.status(error.statusCode).send({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    logger.error(`Unexpected authentication error: ${error.message}`);
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = authenticate;