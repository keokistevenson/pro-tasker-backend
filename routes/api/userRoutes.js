const router = require("express").Router();
const { User } = require("../../models");
const { signToken, authMiddleware } = require("../../utils/auth");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists.",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = signToken(user);

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "This account uses GitHub login.",
      });
    }

    const correctPassword = await user.isCorrectPassword(password);

    if (!correctPassword) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = signToken(user);

    res.json({
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Could not get profile.",
      error: error.message,
    });
  }
});

module.exports = router;