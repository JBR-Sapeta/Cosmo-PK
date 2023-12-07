import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { ENV_KEYS } from 'src/types/constant/env.const';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);

  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get<string>(ENV_KEYS.MAIL_HOST),
    port: this.configService.get<number>(ENV_KEYS.MAIL_PORT),
    auth: {
      user: this.configService.get<string>(ENV_KEYS.MAIL_AUTH_USER),
      pass: this.configService.get<string>(ENV_KEYS.MAIL_AUTH_PASS),
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  /**
   * Sends an account activation email to administrator.
   * @param {string} email user email address.
   * @param {string} username username.
   * @param {string} activationToken activation token that belongs to a given user.
   */
  async sendActivationMail(
    email: string,
    username: string,
    activationToken: string,
  ): Promise<SentMessageInfo> {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>(ENV_KEYS.SMTP_MAIL),
        to: this.configService.get<string>(ENV_KEYS.ADMIN_MAIL),
        subject: 'New User',
        html: `
        <p>Dear COSMO PK,</p>

        <div>
           <p> New user want to join COSMO PK Team. </p>
            Username : ${username} \n
            Email: ${email} 
        </div>

        <div>
           You must follow this link within 7 days of registration to activate  '${username}' account:
        </div>
        <div>
            <a href="${this.configService.get<string>(
              ENV_KEYS.DOMAIN_URL,
            )}/activate?token=${activationToken}">
              Click to activate '${username}' account.
            </a>
        </div>

        <p>Best regards,<p/>
        <p>The COSMO PK Webdev team.<p/>
    `,
      });
      return info;
    } catch (error) {
      this.logger.error(error?.message);
      throw error;
    }
  }

  /**
   * Sends an recovery email for a given user email.
   * @param {string} email user email address.
   * @param {string} username username.
   * @param {string} resetToken reset token that belongs to a given user.
   */
  async sendRecoveryMail(
    email: string,
    username: string,
    resetToken: string,
  ): Promise<SentMessageInfo> {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>(ENV_KEYS.SMTP_MAIL),
        to: email,
        subject: 'Password Recovery for Your Account',
        html: `
        <p>Dear ${username}</p>

        <h2>Please follow the instructions below to regain access to your account.</h2>

        <div>
        Step 1: Open the following link.
        The link will be valid for 1 hour and can be used only once.
        </div>
        <div>
            <a href="${this.configService.get<string>(
              ENV_KEYS.DOMAIN_URL,
            )}/auth/reset?reset=${resetToken}">
                Reset Password
            </a>
        </div>

        <div>
        Step 2: Reset Your Password.
        Choose a secure password and enter it into the provided form. 
        Remember to use a combination of uppercase and lowercase letters, numbers, and special characters to enhance the strength of your password.
        Submit form.
        </div>

        <div>
        Step 3: Log In.
        Once you have successfully reset your password, you can log in to your account using your new credentials.
        </div>
        
        <div>
        If you did not initiate this password reset request, please disregard this email and ensure the security of your account by keeping your password confidential.    
        </div>

        <p>Best regards,<p/>
        <p>The COSMO PK Webdev team.<p/>
    `,
      });
      return info;
    } catch (error) {
      this.logger.error(error?.message);
      throw error;
    }
  }
}
