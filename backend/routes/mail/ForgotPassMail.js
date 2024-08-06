const nodemailer = require("nodemailer");

const sendMail = async (email, user, token) => {
  // const url = `https://byachtservices.com/change-password/${user}/${token}`
  const url = `http://localhost:3000/change-password/${user}/${token}`;
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fa82b781ae8344",
        pass: "2b5527d1339f7c",
      },
    });

    let info = await transporter.sendMail({
      from: '"Haniflix" <no-reply@haniflix.com>',
      to: email,
      subject: "Password Reset Link - Haniflix",
      html: `
        <p><strong>Hello Haniflix User,</strong></p>
        <p>We received a request to reset your password. Click on the link below to reset your password:</p>
        <p><a href="${url}" target="_blank">${url}</a></p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>This link will expire in 1 day for security reasons.</p>
        <p>Thank you!</p>
      `,
    });

    if (info.response.includes("250")) {
      console.log("Reset Password email sent");
    } else {
      console.log("Failed to send Reset Password email");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendMail };
