const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use((req, res, next) => {
  next();
});

// Cross Oigin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data applies to all routes
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// routes
app.use("/employees", require("./routes/api/employees"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
