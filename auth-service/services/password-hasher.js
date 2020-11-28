const bcrypt = require("bcrypt");

module.exports = class PasswordHasher {
  constructor() {
    this.round = 10;
  }

  async hash(password) {
    return bcrypt.hash(password, this.round);
  }

  async check(password, hash) {
    return await bcrypt.compare(password, hash);
  }
};
