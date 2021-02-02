import { IMailProvider, IMessage } from "./../IMailProvider";
import nodemailer from "nodemailer";

export class MailtrapProvider implements IMailProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "03c9d20ffea558",
        pass: "5aee0b3cd67b53",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.from.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
