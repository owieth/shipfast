import nodemailer from "nodemailer";
import Users from "@/models/user";
import bcrypt from "bcryptjs";
import { EMAIL_TYPE } from "@/constants/email";

export async function sendMail(
  email: string,
  userId: string,
  emailType: string
) {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    switch (emailType) {
      case EMAIL_TYPE.VERIFY:
        await Users.findByIdAndUpdate(userId, {
          varificationToken: hashToken,
          varificationTokenExpire: Date.now() + 3600000,
        });
        break;
      case EMAIL_TYPE.RESET_PASSWORD:
        await Users.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpire: Date.now() + 3600000,
        });
        break;
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SMPT_HOST || "",
      port: Number(process.env.SMPT_PORT) || 0,
      auth: {
        user: process.env.SMPT_USER || "",
        pass: process.env.SMPT_PASSWORD || "",
      },
    });

    console.log("mailer", email, userId, emailType);

    const mailOptions = {
      from: process.env.SMPT_USER || "",
      to: email,
      subject: EMAIL_TYPE.VERIFY ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifymail?token=${hashToken}">here</a> to ${
        emailType === EMAIL_TYPE.VERIFY
          ? "verify your email"
          : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifymail?token=${hashToken}
      </p>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
