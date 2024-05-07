'use strict';
const jwt = require("jsonwebtoken");


/**
 *
 * body Calculate-body 
 * arithmeticValue String The arithmetic value
 * returns calculator-Success
 **/
exports.calculatorPOST = function(body,arithmeticValue) {
  return new Promise(function (resolve, reject) {
    const { num1, num2 } = body;
    let result;
    switch (arithmeticValue) {
      case "addition":
        result = num1 + num2;
        break;
      case "subtraction":
        result = num1 - num2;
        break;
      case "multiplication":
        result = num1 * num2;
        break;
      case "division":
        if (num2 === 0) {
          reject({ message: "Division by zero" });
          return;
        }
        result = num1 / num2;
        break;
      default:
        reject({ message: "Invalid arithmetic operation: " + arithmeticValue +" ,you can use only (addition,subtraction,multiplication,division)"});
        return;
    }
    resolve({ result });
  });
}


const usersExample = [
  {
    username: "TEST",
    password: "TEST",
  },
];


/**
 * Signin and get token
 *
 * body Signin 
 * no response value expected for this operation
 **/
exports.signinPOST = function(body) {
  return new Promise((resolve, reject) => {
    const user = usersExample.find((user) => user.username === body.username);
    if (!user || user.password !== body.password) {
      reject({ message: "Invalid username or password"});
    } else {

      resolve({"token": getToken(user.username)});
    }
  });
}

const getToken = (username) => {

  const token = jwt.sign({ username: username }, "RazoSecretKey", {
    expiresIn: "1h",
  });
  console.log(token)
  return token;
};
