import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountReqDto } from './dto/create-account.dto';
import { LoginReqDto } from './dto/login.dto';
import { TokenRes } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAccountReq: CreateAccountReqDto): Promise<void> {
    return this.authService.register(createAccountReq);
  }

  @Post('login')
  async login(@Body() loginReq: LoginReqDto): Promise<TokenRes> {
    return this.authService.login(loginReq);
  }
}
