const jwt = require("jsonwebtoken");
const util = require("util");

authenticate = function (req, res, next) {
  const headerExists = req.headers.authorization;
  console.log("auth", req.headers.authorization);
  const response = {
    status: 201,
    message: {},
  };

  if (headerExists) {
    const token = req.headers.authorization.split(" ")[1];
    const jwtPromise = util.promisify(jwt.verify, { context: jwt });
    jwtPromise(token, process.env.JWT_PRIVATE_KEY)
      .then(() => next())
      .catch(() => {
        _handleAuthError(res, response);
      });
  } else {
    response.status = process.env.STATUS_CODE_401;
    response.message = { message: process.env.TOKEN_EMPTY_ERROR };
    _sendResponse(res, response);
  }
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleAuthError = function (res, response) {
  response.status = process.env.STATUS_CODE_401;
  response.message = { message: process.env.UNAUTHORIZED };
  _sendResponse(res, response);
};

module.exports = {
  authenticate,
};
