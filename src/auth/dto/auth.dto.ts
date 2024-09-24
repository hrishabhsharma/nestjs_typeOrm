import { IsString, IsNotEmpty, Validate, IsEnum } from 'class-validator';
import { IsUsernameEmailOrNumber } from './is-username-email-or-number.validator';

export enum LoginType {
  EMAIL = 'email',
  PHONE = 'phone',
  USERNAME = 'username',
}
export class LogInDto {
  @Validate(IsUsernameEmailOrNumber)
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEnum(LoginType, { message: 'loginType must be either email, phone, or username' })
  @IsString()
  @IsNotEmpty({ message: 'loginType is required' })
  loginType: LoginType;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
