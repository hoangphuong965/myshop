// create and then send token save in the cookie
exports.sendTokenToCookie = (argument_token_user, statusCode, res) => {
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("tokenCookie", argument_token_user, options)
    .json({
      argument_token_user,
    });
};
