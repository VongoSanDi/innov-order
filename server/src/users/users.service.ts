import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/users/schemas/users.schema';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserUpdateResponseDto,
} from '@/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '@/users/dto/user.dto';
import { UserMapper } from '@/mappers/user.mapper';
import { compareDataToHash, encrypt } from '@/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Create user method
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userEntity = UserMapper.toEntity(createUserDto);
    userEntity.password = await encrypt(createUserDto.password);
    const createdUser = new this.userModel(userEntity);
    await createdUser.save();
    return UserMapper.toResponseDto(createdUser);
  }

  async findUserByLogin(login: string): Promise<User> {
    const user = await this.userModel.findOne({ login }).exec();

    if (!user) {
      throw new NotFoundException(`User with login ${login} can't be found`);
    }
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const result = await this.userModel.find().exec();
      return result;
    } catch (error) {
      throw new Error('failed at findAllUsers');
    }
  }

  async updateUser(
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
      throw new UnauthorizedException('Current passwors is incorrect');
    }

    const updateData: any = {};
    if (updateUserDto.newPassword)
      updateData.password = await encrypt(updateUserDto.newPassword);

    const updatedUser = await this.userModel
      .findOneAndUpdate({ login }, { $set: updateData }, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('Failed to update user');
    }
    return updatedUser;
  }

  // Valide que le login de l'utilisateur donnés par le client sont bien les mêmes que ceux de la db
  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.findUserByLogin(login);
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
