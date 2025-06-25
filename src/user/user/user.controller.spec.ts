import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  it('should can say hello', async () => {
    const response = await controller.index('Kevin', '22');
    expect(response).toBe('Hello my name is Kevin and i 22 years old.');
  });

  it('should can get view', () => {
    const response = httpMock.createResponse();
    controller.viewHello('Kevin', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Kevin',
      title: 'Template Engine',
    });
  });

  it('should can get id', () => {
    const response = controller.show('2');
    expect(response).toBe('GET 2');
  });
});
