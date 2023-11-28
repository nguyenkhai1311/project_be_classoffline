const FacebookStrategy = require("passport-facebook").Strategy;
console.log(process.env.FACEBOOK_CLIENT_ID);

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        scope: ["email"],
        profileFields: ["id", "displayName", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(1234);
        console.log(profile);
        done(null, user);
    }
);
