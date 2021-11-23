const config = require("../Config/index");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport')
const makeEmail = require("../Factory/email");
const makeHttpError = require("../Helpers/makeHttpError");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const controller = {
  sendEmail: async (req, res) => {
    const userData = req.body;
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "./../email/index.hbs"),
      "utf8"
    );
    try {
      const validEmail = makeEmail(userData);

      const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: config.emailSender,
            pass: config.emailSenderPassword
          }
        })
      );
      const template = handlebars.compile(emailTemplateSource);
      const htmlToSend = template({
        email: validEmail.email,
        subject: validEmail.subject,
        phone: validEmail.phone,
        name: validEmail.name,
        body: validEmail.body,
      });

      const mailOptions = {
        from: config.emailSender,
        to: config.emailDestination,
        subjbect: userData.subject,
        html: htmlToSend,
      };

      transporter
        .sendMail(mailOptions)
        .then((data, err) => {
          if (data) {
            res.status(200).json({
              statusCode: 200,
              message: "Email sent",
              data: data,
            });
            return;
          }
          res.status(500).json({
            statusCode: 200,
            message: "There was a problem",
            data: err,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      makeHttpError(res, e);
    }
  },
};

module.exports = controller;
