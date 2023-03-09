import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';
import { mailDto } from 'src/shared/dto/mail.dto';
// import {userEntity} from "../../shared/entities/user.entity"
@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    public sendEmail(mail: mailDto) {
        return this.mailerService.sendMail({
            to: mail.to,
            from: mail.from,
            subject: mail.subject,
            html: mail.content,
        })
    }

    async resetPassEmail(mail, token) {
        const url = `http://localhost:3000/auth/resetpassword/${token}`
        return await this.mailerService.sendMail({
            to: mail.to,
            from: mail.from,
            subject: mail.subject,
            template: (__dirname + "/views/resetTemplate").replace("\\dist", "/src"),
            context: {
                user: mail.to,
                url,
            }
        })
    }

    async activateAccount(mail) {
        const url = `http://localhost:3000/auth/${mail.to}/activate-account`
        return await this.mailerService.sendMail({
            to: mail.to,
            from: mail.from,
            subject: mail.subject,
            template: (__dirname + "/views/activateAccount").replace("\\dist", "/src"),
            context: {
                user: mail.to,
                url
            }
        })
    }
}
