// import { Connection } from '../connection/connection';

import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  // connection: Connection;
  // // save() {
  // //   console.info(`Save user with connection ${this.connection.getName()}`);
  // // }
  //   save() {
  //   console.info(`Save user with connection ${this.connection.getName()}`);
  // }

  constructor(private prismaService: PrismaService) {
    console.info('Create user repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}

// factory provider
// export function createUseRepository(connection: Connection): UserRepository {
//   const repository = new UserRepository();
//   repository.connection = connection;
//   return repository;
// }
