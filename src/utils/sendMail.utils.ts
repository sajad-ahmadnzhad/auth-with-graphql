import nodemailer from "nodemailer";
import { SendMailOptions } from "../typings/auth.type";
import tokenModel from "../models/token.model";

export default async (mailOptions: SendMailOptions) => {
  const { userId, ...options } = mailOptions;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 578,
    secure: false,
    logger: true,
    debug: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  transporter.sendMail(options, async (error) => {
    if (error) {
      console.log(error);
      await tokenModel.findOneAndDelete({
        userId: mailOptions.userId,
      });
    }
  });
};
