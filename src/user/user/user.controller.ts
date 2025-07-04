/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from 'generated/prisma';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private mamberService: MemberService,
  ) {}

  @Get('/connection')
  getConnection(): string {
    this.mailService.send();
    this.emailService.send();
    console.info(this.mamberService.getConnectionName());
    this.mamberService.sendEmail();

    return this.connection.getName();
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'hello json',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 302,
    };
  }

  @Get()
  async index(
    @Query('name') name: string,
    @Query('age') age: string,
  ): Promise<string> {
    return this.service.sayHello(name, age);
  }

  @Get('/create')
  async create(
    @Query('first_name') firsName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    return this.userRepository.save(firsName, lastName);
  }

  @Get('/:id')
  show(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post('/store')
  store(): string {
    return 'POST';
  }
}
