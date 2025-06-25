import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(name: string, age: string): string {
    return `Hello my name is ${name || 'Joko'} and i ${age || '20'} years old.`;
  }
}
