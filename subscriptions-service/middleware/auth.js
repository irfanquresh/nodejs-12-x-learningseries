const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function AuthMiddleware(app) {
  const authStrategy = new JwtStrategy(
    {
      secretOrKey: process.env.AUTH_SECRET,
      issuer: process.env.TOKEN_ISSUER,
      algorithms: ["HS256"],
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    },
    async (payload, done) => {
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
