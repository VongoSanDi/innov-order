import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '@/interfaces/user.interface';
import * as bcryptUtils from '../utils/bcrypt';

jest.mock('../mappers/user.mapper.ts', () => ({
  UserMapper: {
    toEntity: jest.fn().mockImplementation((dto) => ({
      login: dto.login,
    })),
    id: 1,
    toResponseDto: jest.fn().mockImplementation((entity) => ({
      login: entity.login,
    })),
  },
}));

jest.mock('../utils/bcrypt.ts', () => ({
  encrypt: jest.fn().mockReturnValue('hashed_password'),
  compareDataToHash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let jwtService: JwtService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      create: jest.fn().mockImplementation((dto) => ({
        ...dto,
        _id: 'some_id',
        save: jest.fn().mockResolvedValue(dto),
      })),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_MODEL',
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock_token'),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      const mockCreateUserDto = {
        login: 'testuser',
        password: 'password1',
      };

      const mockUserResponseDto = {
        id: 'some_id',
        login: 'testuser',
      };

      (UserMapper.toResponseDto as jest.Mock).mockReturnValue(
        mockUserResponseDto,
      );
      const result = await service.create(mockCreateUserDto);
      expect(UserMapper.toEntity).toHaveBeenCalledWith(mockCreateUserDto);
      expect(bcryptUtils.encrypt).toHaveBeenCalledWith('password1');
      expect(result).toEqual(mockUserResponseDto);
    });

    it('should update an user', async () => {
      const login = 'testuser';
      const mockUpdateUserDto = {
        login,
        currentPassword: 'curPass',
        newPassword: 'newPass',
      };

      const mockUser = {
        login,
        password: 'hashedCurPass',
      };

      const mockUserUpdateResponseDto = {
        login,
      };

      (UserMapper.toResponseDto as jest.Mock).mockReturnValue(
        mockUserUpdateResponseDto,
      );
      mockUserModel.findOne.mockResolvedValue(mockUser);
      (bcryptUtils.compareDataToHash as jest.Mock).mockResolvedValue(true);
      (bcryptUtils.encrypt as jest.Mock).mockResolvedValue('hashedNewPass');
      mockUserModel.findOneAndUpdate.mockResolvedValue(mockUpdateUserDto);

      const result = await service.update(login, mockUpdateUserDto);

      expect(bcryptUtils.compareDataToHash).toHaveBeenCalledWith(
        'curPass',
        'hashedCurPass',
      );
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ login });
      expect(bcryptUtils.encrypt).toHaveBeenCalledWith('newPass');
      expect(mockUserModel.findOneAndUpdate).toHaveBeenCalledWith(
        { login },
        { $set: { password: 'hashedNewPass' } },
        { new: true },
      );
      expect(result).toEqual(mockUserUpdateResponseDto);
    });
  });

  describe('login', () => {
    it('user can login', () => {
      const mockUser = {
        _id: 'user_id',
        login: 'testuser',
      };
      const mockUserResponse = {
        login: 'testuser',
      };

      (UserMapper.toResponseDto as jest.Mock).mockReturnValue(mockUserResponse);

      const result = service.login(mockUser as User);

      expect(jwtService.sign).toHaveBeenCalledWith({
        login: 'testuser',
        sub: 'user_id',
      });
      expect(result).toEqual({
        access_token: 'mock_token',
        user: mockUserResponse,
      });
    });
  });
});
