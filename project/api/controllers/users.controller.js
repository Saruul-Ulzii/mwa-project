const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.model(process.env.USER_MODEL_NAME);

const register = function (req, res) {
  if (req.body && req.body.username && req.body.password) {
    const response = {
      status: 201,
      message: {},
    };
    bcrypt.genSalt(parseInt(process.env.SALT_ROUND), (err, salt) =>
      _checkErrorAndCreateHash(err, salt, response, req, res)
    );
  } else {
    res.status(500).json({ Message: process.env.REQUEST_BODY_EMPTY_MESSAGE });
  }
};

_checkErrorAndCreateHash = function (err, salt, response, req, res) {
  if (err) {
    response.status = process.env.CODE_500;
    response.message = err;
  } else {
    bcrypt.hash(req.body.password, salt, (err, passwordHash) =>
      _checkErrorAndCreateUser(err, passwordHash, response, req, res)
    );
  }
};

_checkErrorAndCreateUser = function (err, hashedPassword, response, req, res) {
  if (err) {
    response.status = process.env.CODE_500;
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
  response.status = process.env.CODE_200;
  response.message = savedUser;
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleError = function (err, response) {
  response.status = process.env.CODE_500;
  response.message = err;
};

const login = function (req, res) {
  console.log("login", req.body);
  if (req.body && req.body.username && req.body.password) {
    const response = {
      status: 201,
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
        expiresIn: 1 * 60 * 60,
      });
      console.log("password correct");
      response.status = 200;
      response.message = { success: true, token: token, user: user };
    } else {
      console.log("password incorrect");
      response.status = 401;
      response.message = "Unauthorized";
    }
  } else {
    response.status = 404;
    response.message = "User not found";
  }
};

_checkErrorAndCreateUser = function (err, hashedPassword, response, req, res) {
  if (err) {
    response.status = process.env.CODE_500;
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
  response.status = process.env.CODE_200;
  response.message = savedUser;
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleError = function (err, response) {
  response.status = process.env.CODE_500;
  response.message = err;
};
module.exports = {
  register,
  login,
};
