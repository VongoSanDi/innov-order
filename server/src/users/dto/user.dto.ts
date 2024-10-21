import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  login: string;

  @ApiProperty({ required: true })
  password: string;
}

export class UpdateUserDto {
  login?: string;
  currentPassword: string;
  newPassword?: string;
}

export class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}

/**
 * Response
 */
export class UserResponseDto {
  id: number;
  login: string;
}

export class UserUpdateResponseDto {
  login: string;
}
