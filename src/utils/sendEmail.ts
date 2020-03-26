import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars'


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

  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: './template',
      layoutsDir: './template',
      defaultLayout: 'confirm.hbs',
    },
    viewPath: './template',
    extName: '.hbs',
  }));

  let mailOptions = {
    from: '"Support"<support@lrwtrafficsystems.com>',
    to: email,
    subject: 'Account activation',
    text: 'Hello User',
    template: 'index',
    context: {
      pass: password,
      email: email,
      link: link
    }
  }

  // send mail with defined transport object
   const info = await transporter.sendMail(mailOptions, (err,info) => {
     if(err){
      console.log(err)
     } else {
      console.log(info)
     }
   });
 
  };