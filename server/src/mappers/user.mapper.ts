import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../users/dto/user.dto';
import { User } from '../interfaces/user.interface';

export class UserMapper {
  static toEntity(createUserDto: CreateUserDto): Partial<User> {
    return {
      login: createUserDto.login,
    };
  }

  static toResponseDto(user: User): UserResponseDto {
    const responseDto = new UserResponseDto();
    responseDto.login = user.login;
    return responseDto;
  }

  static updateEntity(updateUserDto: UpdateUserDto): Partial<User> {
    const updates: Partial<User> = {};
    if (updateUserDto.login) updates.login = updateUserDto.login;
    return updates;
  }
}
