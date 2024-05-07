'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');
const jwt = require("jsonwebtoken");

module.exports.calculatorPOST = function calculatorPOST (req, res, next, body, arithmeticValue) {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header missing or invalid");
  }  const token = authorizationHeader.split(" ")[1];
  if (!token) throw new Error("Token not provided");
  try {
    const decoded = jwt.verify(token, "RazoSecretKey");
    console.log("decoded" + decoded);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return utils.writeJson(res, { message: "Unauthorized" }, 401);
  }
  Default.calculatorPOST(body, arithmeticValue)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.signinPOST = function signinPOST (req, res, next, body) {
  Default.signinPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
