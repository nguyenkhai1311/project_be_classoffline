require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const cors = require("cors");

// Khai báo Router
const studentsRouter = require("./routes/students/index");
const teachersRouter = require("./routes/teacher/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");
const connectRouter = require("./routes/connect/index");

// Model
const model = require("./models/index");

// Khai báo Passport
const localPassport = require("./passport/auth/localPassport");
const facebookPassport = require("./passport/auth/facebookPassport");
const googlePassport = require("./passport/auth/googlePassport");
const githubPassport = require("./passport/auth/githubPassport");

// Khai báo Connect-Social
const connectFacebookPassport = require("./passport/connect/facebookPassport");
const connectGooglePassport = require("./passport/connect/googlePassport");
// const connectGithubPassport = require("./passport/connect/githubPassport");

const AuthMiddleware = require("./http/middlewares/AuthMiddleware");
const DeviceMiddleware = require("./http/middlewares/DeviceMiddleware");

var app = express();
// app.use(cors());

app.use(
    session({
        secret: "f8",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await model.User.findByPk(id);
    done(null, user);
});

// Login Social
passport.use("local", localPassport);
passport.use("facebook", facebookPassport);
passport.use("google", googlePassport);
passport.use("github", githubPassport);

// Connect Social
passport.use("connectFacebook", connectFacebookPassport);
passport.use("connectGoogle", connectGooglePassport);
// passport.use("connect-github", connectGithubPassport);

// view engine setup
app.set("views", path.join(__dirname, "./resources/views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layouts/master.layout.ejs"); // set layout default

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/auth", authRouter);
app.use(AuthMiddleware);
app.use(DeviceMiddleware);
app.use("/admin", adminRouter);
app.use("/", studentsRouter);
app.use("/teacher", teachersRouter);
app.use("/connect", connectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render("error/404", {
        layout: "layouts/auth.layout.ejs",
    });
    // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error/500", {
        layout: "layouts/auth.layout.ejs",
    });
});

module.exports = app;
