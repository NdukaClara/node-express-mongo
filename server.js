require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// connect to MongoDB
connectDB();

// custom middleware logger
app.use((req, res, next) => {
  next();
});

// handle options credentials checks - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Oigin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data applies to all routes
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
