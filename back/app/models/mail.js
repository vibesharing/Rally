var nodemailer = require("nodemailer");

var Mail = {


  sendMail : function(req, res) {

    var transporter = nodemailer.createTransport(
      {
        "type": "SMTP",
        "host": "smtp.gmail.com",
        "secureConnection": true,
        "port": 465,
        "auth": {
          "user": "buret.hadrien@orange.fr",
          "pass": "EAUTH"
        }
    });

    console.log(req.body);

    transporter.sendMail({
      from: '"mean-starter" buret.hadrien@orange.fr',
      to: "Receiver Name <buret.hadrien@orange.fr>",
      subject: "Emailing with nodemailer",
      text: "Email Example with nodemailer"
    }, function(error, response) {
      if(error) {
        console.log(error);
      }
      else {
        console.log("Message sent: " + response.message);
      }

      // smtpTransport.close();
    });
  }
};

module.exports = Mail;
