"use strict";

module.exports.secure = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Secure msg : 🙌 congratulations! 🦄 ",
        input: event,
      },
      null,
      2
    ),
  };
};
