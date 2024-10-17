import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@/users/dto/user.dto';
import { User } from '@/users/schemas/users.schema';

export class UserMapper {
  static toEntity(createUserDto: CreateUserDto): Partial<User> {
    const user = new User();
    user.login = createUserDto.login;
    return user;
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
