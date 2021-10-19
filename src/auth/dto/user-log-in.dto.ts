import { IsString } from 'class-validator';

export class UserLogInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
