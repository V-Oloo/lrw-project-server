import * as nodemailer from 'nodemailer';

export const sendEmailResetPWD = async ( email : string, link: string, name: string) => {
  
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
    text: `Hello ${name}`, // plain text body
    html: `<b> click the link below to reset your account password</b>           
           <a href="${link}">Reset Password</a>`, // html body
  }).then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};