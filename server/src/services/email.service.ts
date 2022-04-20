import nodemailer, { SentMessageInfo } from 'nodemailer';
import * as path from 'path';
import hbs from 'nodemailer-express-handlebars';

import { config } from '../config/config';
import { EmailTypeEnum } from '../enums/enums';
import { emailContent } from '../constants/email.content';
import { constants } from '../constants/constants';

class EmailService {

    public async sendEmailHBS(userEmail:string, userName:string, type: EmailTypeEnum, context:{} = {}):Promise<SentMessageInfo> {
        Object.assign(context, { frontendUrl: constants.FRONTEND_URL, userName });

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep-2021',
            service: 'gmail',
            secure: false,
            requireTLS: true,
            auth: {
                user: config.ADMIN_EMAIL,
                pass: config.ADMIN_EMAIL_PASSWORD,
            },
        });

        const handlebarsOptions = {
            viewEngine: {
                extname: 'hbs',
                layoutsDir: path.resolve(__dirname, '../', 'email-templates', 'layouts'),
                defaultLayout: 'layout',
                partialsDir: path.resolve(__dirname, '../', 'email-templates', 'partials'),
            },
            viewPath: path.resolve(__dirname, '../', 'email-templates'),
            extName: '.hbs',
        };
        emailTransporter.use('compile', hbs(handlebarsOptions));

        const { subject ,template} = emailContent[type];

        return emailTransporter.sendMail({
            // @ts-ignore
            to: userEmail, subject, template, context,
        });
    }
}

export const emailService = new EmailService();
