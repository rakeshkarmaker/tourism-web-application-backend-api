import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(email: string, title: string, message: string): Promise<void> {
        try {
            const mailOptions = {
                to: email,
                from: 'tourifybd@gmail.com', // Ensure you use a verified email
                subject: title,
                text: message,
                html: `<b>${message}</b>`, // Basic HTML format
            };

            // Use await to handle async operation properly
            await this.mailerService.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Unable to send email'); // Optional: custom error handling
        }
    }
}
