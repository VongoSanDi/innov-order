import { User } from '../interfaces/user.interface';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  LoginResponseDto,
  UpdateUserDto,
  UserResponseDto,
  UserUpdateResponseDto,
} from './dto/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { compareDataToHash, encrypt } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userEntity = UserMapper.toEntity(createUserDto);
    userEntity.password = await encrypt(createUserDto.password);
    const createdUser = await this.userModel.create(userEntity);
    return UserMapper.toResponseDto(createdUser);
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();
    if (!user) {
      throw new NotFoundException(`User with login ${login} can't be found`);
    }
    return user;
  }

  async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.userModel.findOne({ login });

    if (!user) {
      throw new NotFoundException(`User ${login} not found`);
    }
    const isPasswordMatching = await compareDataToHash(
      updateUserDto.currentPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const updateData: any = {};
    if (updateUserDto.newPassword)
      updateData.password = await encrypt(updateUserDto.newPassword);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { login },
      { $set: updateData },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('Failed to update user');
    }

    return { login: updatedUser.login };
  }

  // Valide que le login de l'utilisateur donnés par le client sont bien les mêmes que ceux de la db
  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.findByLogin(login);
    const isPasswordMatching = await compareDataToHash(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Retourne le token JWT
  login(user: User): LoginResponseDto {
    const payload = { login: user.login, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: UserMapper.toResponseDto(user),
    };
  }
}
