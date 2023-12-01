const GitHubStrategy = require("passport-github2").Strategy;
const model = require("../models/index");
const UserSocial = model.UserSocial;

module.exports = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        console.log(id);
        const provider = "github";
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
