import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto'; // Importing the the DTO
import { TourAdvertisementDto } from './dto/tour-advertisement.dto';


// v1.4.0- Email promotinal api system and email sending system added
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendmail')
  async sendMail(@Body() sendMailDto: SendMailDto): Promise<void> {
    const { email, title, message } = sendMailDto; // Destructure the DTO to get the values
    await this.mailService.sendMail(email, title, message);
  }

  @Post('send-tour-advertisement')
  async sendTourAdvertisement(
    @Body() tourAdDto: TourAdvertisementDto,
  ): Promise<void> {
    const { email, tourName, location, description, price, imageUrl } =
      tourAdDto;

    // Send the email with the provided tour information Automatically
    const emailTitle = `Exclusive Tour Offer: ${tourName}`;
    const emailMessage = `
      <h2>Special Tour Offer</h2>
      <p><strong>Tour:</strong> ${tourName}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Price:</strong> $${price}</p>
      ${imageUrl ? `<img src="${imageUrl}" alt="Tour Image" />` : ''}
    `;

    await this.mailService.sendMail(email, emailTitle, emailMessage);
  }
}
