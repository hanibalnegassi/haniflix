const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fa82b781ae8344",
    pass: "2b5527d1339f7c",
  },
});

async function send_mail(emailData) {
  const info = await transporter.sendMail(emailData);
  console.log("Message sent: %s", info.messageId);
}

module.exports = send_mail;
