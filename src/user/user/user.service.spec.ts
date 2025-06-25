import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be able to say hello', () => {
    const response = service.sayHello('Kevin', '22');
    expect(response).toBe('Hello my name is Kevin and i 22 years old.');
  });
});
