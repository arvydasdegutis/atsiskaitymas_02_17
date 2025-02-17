const express = require("express");
const { sayHello, addRequestedDate } = require("./middlewares/appMiddlewares");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const appointmentRoutes = require("./routers/appointmentRoutes");

const app = express();
//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//body parser
app.use(express.json());

//middlewares for cookies parsing
app.use(cookieParser());


app.use(sayHello, addRequestedDate);

//routes

app.use("/api/v1/users", userRouter); 
app.use("/api/v1/appointments", appointmentRoutes);

app.use(errorHandler);
module.exports = app;
