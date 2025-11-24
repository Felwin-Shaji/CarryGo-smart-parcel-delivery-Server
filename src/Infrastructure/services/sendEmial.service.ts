import { google } from "googleapis";
import type { IMailService } from "../../Application/interfaces/services_Interfaces/email-service.interface.js";
import dotenv from "dotenv";
import nodemailer, { type Transporter } from "nodemailer";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN as string });

export class MailService implements IMailService {
  private transporter?: Transporter;

  private async initTransporter() {
    const accessToken = (await oAuth2Client.getAccessToken()).token;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER!,
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        refreshToken: process.env.REFRESH_TOKEN!,
        accessToken: accessToken!,
      },
    });
  }

  /* -----------------------------------------------
     SEND OTP
  ------------------------------------------------ */
  async sendOTP(email: string, otp: string): Promise<void> {
    await this.initTransporter();

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
  }

  /* -----------------------------------------------
     SEND GENERATED HUB PASSWORD
  ------------------------------------------------ */
  async sendCustomPassword(email: string): Promise<void> {
    await this.initTransporter();

    const emailPrefix = email?.split("@")[0] || "";
    const last4Email = emailPrefix.slice(-4) || "abcd";

    const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;">
      <h3>Your Hub Account is Ready </h3>

      <p>Your login access for the <strong>CarryGo Hub Dashboard</strong> has been created.</p>

      <p><strong>Email:</strong> ${email}</p>

      <br/>

      <p><strong>Your Password Format:</strong></p>

      <p>
        The password is automatically generated based on:<br/>
        - The <strong>last 4 characters</strong> of your email <em>before the @ symbol</em><br/>
        - The <strong>last 4 digits</strong> of <em>the mobile number used during hub creation</em><br/><br/>

        <strong>Example (DO NOT USE THIS):</strong><br/>
        If your email is <code>hubkochi99@gmail.com</code><br/>
        → last 4 characters before @ = <strong>i99</strong><br/>
        And if your mobile number is <code>9876543210</code><br/>
        → last 4 digits of mobile = <strong>3210</strong><br/><br/>

        Then your password format would be:<br/>
        <strong>i99@3210</strong><br/><br/>

        <u>Your actual password will follow the same pattern using YOUR email and YOUR mobile number used during registration.</u>
      </p>

      <br/>

      <p>Please log in and <strong>change your password immediately</strong> for security.</p>
      <p>If you did not expect this email, please contact your agency admin.</p>

      <br/>
      <p>— CarryGo Team</p>
    </div>
  `;

    await this.transporter?.sendMail({
      from: `"CarryGo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your CarryGo Hub Account Login Details",
      html,
    });
  }


}
