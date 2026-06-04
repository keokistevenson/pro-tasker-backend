const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function sendVerificationEmail(to, code) {
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to,
        subject: "Verify your Pro-Tasker email",
        text: `Your Pro-Tasker verification code is: ${code}. This code expires in 15 minutes.`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendVerificationEmail,
};