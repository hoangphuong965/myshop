exports.passwordValidate = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPassword = await password.length;
      if (checkPassword < 6) {
        resolve({
          errCode: 1,
          errMessage: "Must be at least 6",
        });
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.emailValidate = (userInfoEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      function validateEmail(email) {
        const reg =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
      }
      const email = await userInfoEmail;
      if (!validateEmail(email)) {
        resolve({
          errCode: 1,
          errMessage: "Please, enter your email",
        });
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
