const User = require("../models/index")["User"];
const jwt = require("jsonwebtoken");
const { use } = require("../controllers/users-controller");
const PasswordHasher = require("./password-hasher");

module.exports = class UsersService {
  constructor() {
    this.passwordHasher = new PasswordHasher();
  }

  async findAll(userId) {
    //return await User.findAll({ where: { userId } });
  }

  async findOne(id) {
    //return await User.findOne({ where: { id } });
  }

  async findOneByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async create(user) {
    user.password = await this.passwordHasher.hash(user.password);
    user = await User.create(user);
    return this.generateACcessToken(user);
  }

  async deleteOne(id) {
    //return await User.destroy({ where: { id } });
  }

  async signIn(email, password) {
    let user = await this.findOneByEmail(email);
    if (!user) {
      return null;
    }

    if ((await this.passwordHasher.check(password, user.password)) === true) {
      return this.generateACcessToken(user);
    } else {
      return null;
    }
  }

  generateACcessToken(user) {
    if (!user) {
      throw new Error("Invalid User");
    }

    let userInfo = user.toJSON();
    delete userInfo.password;

    let payload = {
      user: userInfo,
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      issuer: process.env.TOKEN_ISSUER,
      subject: `${user.id}`,
    });

    return token;
  }
};
