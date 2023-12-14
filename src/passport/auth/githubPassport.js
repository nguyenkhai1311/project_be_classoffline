const GitHubStrategy = require("passport-github2").Strategy;
const model = require("../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

module.exports = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["user:email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const provider = "github";

        let providerDetail = await UserSocial.findOne({
            where: {
                provider: provider,
                providerId: id,
            },
        });

        if (!providerDetail?.userId && !req.user) {
            done(null, false, {
                message: req.flash(
                    "error",
                    "Không tồn tại tài khoản nào liên kết với github này!"
                ),
            });
            return;
        }

        if (!providerDetail?.userId) {
            const userId = req.user.id;
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
            req.isConnect = true;
            done(null, user);
            return;
        }

        const user = await User.findOne({
            where: {
                id: providerDetail.userId,
            },
        });

        done(null, user);
        return;
    }
);
