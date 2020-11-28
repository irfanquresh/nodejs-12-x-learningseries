const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function AuthMiddleware(app) {
  //console.log(`process.env.AUTH_SECRET : ${process.env.AUTH_SECRET}`);

  const authStrategy = new JwtStrategy(
    {
      secretOrKey: process.env.AUTH_SECRET,
      algorithms: ["HS256"],
      issuer: process.env.TOKEN_ISSUER,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    },
    async (payload, done) => {
      // console.log(`payload : ${payload.sub}`);
      let id = parseInt(payload.sub);
      if (id) {
        done(null, id);
      } else {
        done(null, false);
      }
    }
  );

  passport.use(authStrategy);
  app.use(passport.initialize());
};
