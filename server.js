// DEPENDENCIES
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/connection");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use(routes);

app.get("/", (req, res) => {
  res.send("Secure Web Portal API is running.");
});

// PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});EOF

# 9th Commit
git add .
git commit -m "Created Express server setup, connected MongoDB, added middleware. mounted main routes."

# Add text to auth.js file
cat <<EOF > utils/auth.js
const jwt = require('jsonwebtoken');
 
const secret = process.env.JWT_SECRET;
const expiration = "$JWT_EXPIRATION";
 
module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;
 
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
 
    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to do that.' });
    }
 
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token.' });
    }
 
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
 
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
