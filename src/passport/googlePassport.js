const GoogleStrategy = require("passport-google-oidc");
const model = require("../models/index");
const UserSocial = model.UserSocial;

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        prompt: "select_account",
    },
    async (issuer, profile, done) => {
        const { id } = profile;
        const provider = "google";
        let providerDetail = await UserSocial.findOne({
            where: {
                provider: provider,
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
