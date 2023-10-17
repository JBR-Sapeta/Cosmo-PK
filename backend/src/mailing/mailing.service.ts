import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailingService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get<string>('MAIL_HOST'),
    port: this.configService.get<number>('MAIL_PORT'),
    auth: {
      user: this.configService.get<string>('MAIL_AUTH_USER'),
      pass: this.configService.get<string>('MAIL_AUTH_PASS'),
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
    return await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_MAIL'),
      to: this.configService.get<string>('ADMIN_MAIL'),
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
              'DOMAIN_URL',
            )}/users/activate?token=${activationToken}">
              Click to activate '${username}' account.
            </a>
        </div>

        <p>Best regards,<p/>
        <p>The COSMO PK Webdev team.<p/>
    `,
    });
  }
}
