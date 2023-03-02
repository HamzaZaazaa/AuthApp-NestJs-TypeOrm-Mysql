import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // 'smtp://hamza.zaazaa01@hotmail.com:hamza0hamza@smtp.live.com'
      transport: {
        // service: 'Gmail',
        host: 'ssl0.ovh.net',
        port: '465',
        ignoreTLS: true,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'contact@tacktek.com', // generated ethereal user
          pass: 'ahmed+20556816' // generated ethereal password
        },
      },
      // defaults: {
      //   from: '"Hamza Zaazaa" <hamza.zaazaa01@hotmail.com>'
      // },
      template: {
        dir: __dirname + '/views',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    })
  ],
  controllers: [],
  providers: [MailingService],
  exports: [MailingService]
})
export class MailingModule { }
