const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.set("trust proxy", true);
// Define your CORS options
var corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(
  cors({
    // origin: 'http://localhost:3000', // Allow requests only from this origin
    origin: [
      "http://localhost:3000",
      "https://gurez-live.netlify.app",
      "https://versel-frontend-tqlk.vercel.app",
      "https://gurez001.netlify.app",
      "http://192.168.1.5:3000",
      "http://192.168.1.3:3000",
      "https://66111c1eb16054c414603e00--stupendous-genie-956f87.netlify.app"
    ], // Allow requests only from this origin
    Headers: true,
    exposedHeaders: "Set-Cookie",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // Allow only specified HTTP methods
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "cookies",
    ],
    credentials: true, // Allow sending cookies and other credentials
    optionsSuccessStatus: 200,
    preflightContinue: false,
  })
);

// Use CORS middleware with options
// app.use(cors(corsOptions));

//Routers import
const productRouter = require("./routes/productsRoutes");
const userRouter = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoute");
const imageRouter = require("./routes/imageGelleryRoute");
const categoreRoute = require("./routes/categoreRoute");
const blogPostRouter = require("./routes/blogPostRouter");
const blogCategoreRouter = require("./routes/blogCategoreRouter");
const reviewsRouter = require("./routes/reviewsRouter");
const seoRouter = require("./routes/seoRouter");
const MasterCouponRoute = require("./routes/MasterCouponRoute");
const blogcommentrouter = require("./routes/blogCommentroute");
const contactrouter = require("./routes/ContactRoute");
const bookmarkrouter = require("./routes/BookmarkRoute");
const postMetaRout = require("./routes/PostMetaRout");
const subscription_route = require("./routes/subscription_route");

app.use("/api/v1/", subscription_route);
app.use("/api/v1/", productRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", order);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", imageRouter);
app.use("/api/v1", categoreRoute);
app.use("/api/v1", blogPostRouter);
app.use("/api/v1", blogCategoreRouter);
app.use("/api/v1", seoRouter);
app.use("/api/v1", reviewsRouter);
app.use("/api/v1", MasterCouponRoute);
app.use("/api/v1", blogcommentrouter);
app.use("/api/v1", contactrouter);
app.use("/api/v1", bookmarkrouter);
app.use("/api/v1", postMetaRout);

//-- Middleware for err
const errMiddleware = require("./middleware/error");
app.use(errMiddleware);
module.exports = app;
