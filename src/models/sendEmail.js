const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const logger = require('winston');

dotenv.config();


const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  port: 25,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class SendEmail {
  constructor(receiver, subject) {
    this.receiver = receiver;
    this.subject = subject;
  }

  sendEmail(message) {
    logger.debug('mensagem a ser enviaada');
    logger.debug(message);
    const HelperOptions = {
      form: '"Estoqueando" <ifspestoqueando@gmail.com>',
      to: this.receiver,
      subject: this.subject,
      html: message,
      // html: readFile(emailconfirmacao)
    };

    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return logger.debug(error);
      }
      logger.debug(`The message was sent: ${info.response}`);
      logger.debug(info);
    });
  }
}

module.exports = SendEmail;
