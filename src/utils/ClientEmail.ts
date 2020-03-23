import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars'
import { EmailDto } from 'src/tasks/dto/email.dto';


export const clientEmail = async (data: any, emailDto: EmailDto) => {
    console.log(data);
    const { email, address, start, end, org, name } = emailDto;
   
  
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
      defaultLayout: 'index.hbs',
    },
    viewPath: './template',
    extName: '.hbs',
  }));

  let mailOptions = {
    from: '"Support"<support@lrwtrafficsystems.com>',
    to: email,
    subject: 'LRW TRAFFIC SYSTEMS',
    text: 'Hello User',
    template: 'index',
    context: {
      workStart: start,
      workEnd: end,
      address: address,
      org: org,
      name: name
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