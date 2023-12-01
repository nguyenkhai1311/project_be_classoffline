const FacebookStrategy = require("passport-facebook").Strategy;
const model = require("../models/index");
const UserSocial = model.UserSocial;

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        scope: ["email"],
        profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const provider = "facebook";
        let providerDetail = await UserSocial.findOne({
            where: {
                provider: provider,
                providerId: id,
            },
        });

        if (!providerDetail) {
            providerDetail = await UserSocial.create({
                provider: provider,
                providerId: id,
            });
        }

        return done(null, providerDetail);
    }
);
