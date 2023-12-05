const GitHubStrategy = require("passport-github2").Strategy;
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const userId = req.user.id;
        const provider = "github";

        await UserSocial.create({
            userId: userId,
            provider: provider,
            providerId: id,
        });
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });
        done(null, user);
        return;
    }
);
