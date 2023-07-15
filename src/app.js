require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const cartRoute = require("./routes/cartRoute");
const authenticatedMiddleware = require("./middlewares/authenticate");
const orderRoute = require("./routes/orderRoute");
const adminRoute = require("./routes/adminRoute");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 1000,
    message: {
      message: "too many request",
    },
  })
);
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/carts", authenticatedMiddleware, cartRoute);
app.use("/orders", authenticatedMiddleware, orderRoute);
app.use("/admin", adminRoute);
// app.use("/users", userRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
