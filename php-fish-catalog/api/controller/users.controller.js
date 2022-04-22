const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.model(process.env.USER_MODEL);

const register = function (req, res) {
  if (req.body && req.body.username && req.body.password) {
    const response = {
      status: process.env.RESPONSE_CREATED_201,
      message: {},
    };
    bcrypt.genSalt(parseInt(process.env.SALT_ROUND), (err, salt) =>
      _checkErrorAndCreateHash(err, salt, response, req, res)
    );
  } else {
    res
      .status(process.env.RESPONSE_SERVER_ERROR_500)
      .json({ Message: process.env.REQUEST_BODY_EMPTY_MESSAGE });
  }
};

_checkErrorAndCreateHash = function (err, salt, response, req, res) {
  if (err) {
    response.status = process.env.RESPONSE_SERVER_ERROR_500;
    response.message = err;
  } else {
    bcrypt.hash(req.body.password, salt, (err, passwordHash) =>
      _checkErrorAndCreateUser(err, passwordHash, response, req, res)
    );
  }
};

_checkErrorAndCreateUser = function (err, hashedPassword, response, req, res) {
  if (err) {
    response.status = process.env.RESPONSE_SERVER_ERROR_500;
    response.message = err;
  } else {
    let newUser = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };
    UserSchema.create(newUser)
      .then((savedUser) => {
        _onSuccessUserCreation(savedUser, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  }
};

_onSuccessUserCreation = function (savedUser, response) {
  response.status = process.env.RESPONSE_OK_200;
  response.message = savedUser;
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleError = function (err, response) {
  response.status = process.env.RESPONSE_SERVER_ERROR_500;
  response.message = err;
};

const login = function (req, res) {
  if (req.body && req.body.username && req.body.password) {
    const response = {
      status: process.env.RESPONSE_OK_200,
      message: {},
    };
    UserSchema.findOne({ username: req.body.username })
      .then((user) => this._checkPass(user, req, response))
      .catch((err) => _handleError(err, response))
      .finally(() => {
        _sendResponse(res, response);
      });
  }
};

_checkPass = function (user, req, response) {
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ name: user.name }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE_DAY,
      });
      console.log("password correct");
      response.status = process.env.RESPONSE_OK_200;
      response.message = { success: true, token: token };
    } else {
      console.log("password incorrect");
      response.status = process.env.RESPONSE_UNAUTHORIZED_401;
      response.message = process.env.UNAUTHORIZED;
    }
  } else {
    response.status = process.env.RESPONSE_NOT_FOUND_404;
    response.message = process.env.USER_NOT_FOUND_MESSAGE;
  }
};

_checkErrorAndCreateUser = function (err, hashedPassword, response, req, res) {
  if (err) {
    response.status = process.env.RESPONSE_SERVER_ERROR_500;
    response.message = err;
  } else {
    let newUser = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };
    UserSchema.create(newUser)
      .then((savedUser) => {
        _onSuccessUserCreation(savedUser, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  }
};

_onSuccessUserCreation = function (savedUser, response) {
  response.status = process.env.RESPONSE_OK_200;
  response.message = savedUser;
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleError = function (err, response) {
  response.status = process.env.RESPONSE_SERVER_ERROR_500;
  response.message = err;
};
module.exports = {
  register,
  login,
};
