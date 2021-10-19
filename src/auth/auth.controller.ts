import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogInDto } from './dto/user-log-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.signUp(userSignUpDto);
  }

  @Post('logIn')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() userLogInDto: UserLogInDto) {
    return this.authService.logIn(userLogInDto);
  }
}
