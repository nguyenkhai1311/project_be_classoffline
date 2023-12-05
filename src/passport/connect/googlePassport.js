const GoogleStrategy = require("passport-google-oidc");
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new GoogleStrategy(
    {
        clientID: process.env.CONNECT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.CONNECT_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CONNECT_GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["profile", "email"],
        prompt: "select_account",
    },
    async (req, issuer, profile, done) => {
        const { id } = profile;
        console.log(1234);
        console.log(req.user.id);
        const userId = req.user.id;
        const provider = "google";

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
