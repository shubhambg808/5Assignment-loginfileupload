const express = require("express");
const app = express();

const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const { errorMiddleWare } = require("./middleware/middlewares");

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use(errorMiddleWare);
module.exports = app;
