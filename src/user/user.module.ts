import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { MemberService } from './member/member.service';
// import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user-repository/user-repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: Connection,
    //   useClass:
    //     process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection,
    // },
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
    // factory provider
    // {
    //   provide: UserRepository,
    //   useFactory: createUseRepository,
    //   inject: [Connection],
    // },
    UserRepository,
    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}
