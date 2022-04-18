import bcrypt from "bcrypt";

export function hashPassword(password = "") {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        resolve("");
      }
      resolve(hash);
    });
  });
}

export function comparePassword(password = "", hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        resolve(false);
      }
      resolve(result);
    });
  });
}

