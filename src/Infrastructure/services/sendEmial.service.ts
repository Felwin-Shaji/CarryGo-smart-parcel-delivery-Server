import { google } from "googleapis";
import type { IMailService } from "../../Application/interfaces/services/email.service.js";
import dotenv from "dotenv"
import nodemailer, { type Transporter } from "nodemailer";
dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN as string });

export class MailService implements IMailService {
  private transporter?: Transporter;

  async sendOTP(email: string, otp: string): Promise<void> {

    const accessToken = (await oAuth2Client.getAccessToken()).token;

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER!,
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        refreshToken: process.env.REFRESH_TOKEN!,
        accessToken: accessToken!,
      }
    });

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.4">
        <h3>Your verification code</h3>
        <p>Use <strong>${otp}</strong> to verify your email. This code expires in 2 minutes.</p>
        <p>If you didn't request this, ignore this email.</p>
      </div>
    `;

    await this.transporter?.sendMail({
      from: `"CarryGo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CarryGo OTP Code",
      html,
    });
  };
};
