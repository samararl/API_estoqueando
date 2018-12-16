const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 25,
  secure: true,
  auth: {
    user: 'ifspestoqueando@gmail.com',
    pass: '*******',
  },
  tls: {
    rejectUnauthorized: false,
  },
});


class emailBusiness {
  constructor(connection) {
    this.connection = connection;
  }

  sendEmail(email) {
    const HelperOptions = {
      form: '"Estoqueando" <ifspestoqueando@gmail.com>',
      to: email,
      subject: 'Confirmação de cadastro Estoqueando',
      html: '<b>Olá,</b><br>Este é o e-mail de confirmação para o seu cadastro na aplicação Estoqueando. Seja muito bem vindo(a)!<br>Por favor, acesse o link https://projetoestoqueando.blogspot.com/ para finalizar o seu cadastro. <br><br><font color="#FFD700"> Atenciosamente,<br><img src="https://ibb.co/jVPHaU">',
      // html: readFile(emailconfirmacao)
    };

    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`The message was sent: ${info.response}`);
      console.log(info);
    });
  }
}

module.exports = emailBusiness;
