import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserResponseDto, CreateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            // findUserByLogin: jest.fn(),
            // findAllUsers: jest.fn(),
            // updateUser: jest.fn(),
            // validateUser: jest.fn(),
            // login: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);
    usersController = moduleRef.get(UsersController);
  });

  describe('createUser', () => {
    it('should return an object with the new created user', async () => {
      const mockUserResponse: UserResponseDto = {
        id: 1,
        login: 'testuser',
      };

      const createUserDto: CreateUserDto = {
        login: 'testuser',
        password: 'password1',
      };
      jest
        .spyOn(usersService, 'create')
        .mockImplementation(async () => mockUserResponse);
      const result = await usersController.create(createUserDto);

      expect(result).toBe(mockUserResponse);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
