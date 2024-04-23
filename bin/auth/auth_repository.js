const config = require('../infra/configs/global_config');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password) {
    return this.password === password;
  }
}

module.exports.findByUsername = (username, cb) => {
  const userData = config.get('/basicAuth');

  if (userData.username !== username) {
    return '';
  }

  const user = new User(userData.username, userData.password);
  cb(user);
};
