import * as nodemailer from 'nodemailer';

export const sendEmail = async (email: string, link: string, password: string) => {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    tls: {
         rejectUnauthorized: false
         },
    auth: {
      user: 'oloov534@gmail.com', 
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Support"<support@lrwtrafficsystems.com>',
    to: email, // list of receivers
    subject: 'Account activation', // Subject line
    text: 'Hello User', // plain text body
    html: `<b>Thank you for creating an account with us, you are most welcome</b>
            click the link below to activate your account
           <a href="${link}">confirm Email</a>
           </b> then you can proceed to login using: ${password}`, // html body
  }).then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};