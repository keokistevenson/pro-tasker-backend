// DEPENDENCIES
const express = require("express");
require("dotenv").config();

const cors = require("cors");

const connectDB = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// ROUTES
app.use(routes);

app.get("/", (req, res) => {
  res.send("Secure Web Portal API is running.");
});

// PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

