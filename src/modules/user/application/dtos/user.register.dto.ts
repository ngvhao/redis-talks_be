import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PASSWORD_VALID_REGEX } from 'src/shared/utils/constants';

export class UserRegisterDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD_VALID_REGEX, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}
