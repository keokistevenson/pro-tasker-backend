const router = require("express").Router();
const { User } = require("../../models");

const { signToken, authMiddleware } = require("../../utils/auth");
const { sendVerificationEmail } = require("../../utils/emailService");

// Generate 6-digit code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists.",
      });
    }

    const verificationCode = generateVerificationCode();

    const user = await User.create({
      username,
      email,
      password,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: Date.now() + 15 * 60 * 1000,
    });

    await sendVerificationEmail(user.email, verificationCode);

    const token = signToken(user);

    res.status(201).json({
      message: "User registered successfully. Verification code sent.",
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

router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.isEmailVerified) {
      return res.json({
        message: "Email is already verified.",
      });
    }

    if (
      !user.emailVerificationCode ||
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Verification code is invalid or expired.",
      });
    }

    if (user.emailVerificationCode !== code) {
      return res.status(400).json({
        message: "Invalid verification code.",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Email verification failed.",
      error: error.message,
    });
  }
});

module.exports = router;