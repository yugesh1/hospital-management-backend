const sendToken = (user, statusCode, res) => {
  console.log(user, "useer");

  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
