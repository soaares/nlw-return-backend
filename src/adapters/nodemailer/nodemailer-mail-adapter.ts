import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";
 
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "439ce4f208e95a",
    pass: "42719cfa3eb15a"
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail( { subject, body } : SendMailData) {

        await transport.sendMail({
            from: "Raphael Soares <oi@feedback.com>",
            to: "Teste Email <teste@gmail.com>",
            subject,
            html: body
        })
    }
}
