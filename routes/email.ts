import { Request, Response, Router } from "express";
import nodemailer  from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

interface IEmail {
  text: string;
  subject: string;
  name: string;
  address: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: `${process.env.CLIENT_EMAIL}@gmail.com`,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
  tls: {rejectUnauthorized: false}
  });

  const setMailData = ({ address, name, subject, text }: IEmail): nodemailer.SendMailOptions => ({
    from: {
      address,
      name
    },  // sender address
    to: [`${process.env.BAND_EMAIL}@gmail.com`],   // list of receivers
    subject,
    html: `
    <h4>Hello,</h4>

    <p>${text}</p>

    <p>Please contact me at:<br>
    Email: ${address}</p>

    <h4>Best regards,<br>
    ${name}</h4>
    `
  });

router.post("/send", (req: Request, res: Response) => { 
  const { text, subject, address, name } = req.body as IEmail;
  const mailData = setMailData({ address, name, subject, text });
  transporter.sendMail(mailData, (error, info) => {
    if (error){
      return res.status(500).send({
        ...error
      })
    };

    return res.status(200).json({
      id: info.messageId
    })
  })
 })

 export default router;
