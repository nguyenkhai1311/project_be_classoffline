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
            const userId = req.user.id;
            const user = await UserSocial.create({
                userId: userId,
                provider: provider,
                providerId: id,
            });
            done(null, false, {
                message:
                    "Không tồn tại tài khoản nào liên kết với facebook này!",
            });
            return;
        }

        if (!providerDetail?.userId) {
            done(null, false, {
                message:
                    "Không tồn tại tài khoản nào liên kết với facebook này!",
            });
            return;
        }

        return done(null, user);
    }
);
