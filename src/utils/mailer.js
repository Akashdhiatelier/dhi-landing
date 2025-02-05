import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testwts07@gmail.com",
    pass: "tbxx gxjn jqis nufu",
  },
});

const sendMail = (subject, toEmail, message) => {
  console.log("inside send mail");
  return new Promise(async (resolve, reject) => {
    try {
      const mailOptions = {
        from: "testwts07@gmail.com",
        to: toEmail,
        subject: subject,
        text: message,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      resolve("Email sent: " + info.response);
    } catch (error) {
      // console.error("Error while sending mail", error);
      reject(new Error("Error while sending mail: " + error));
    }
  });
};

export default sendMail;
