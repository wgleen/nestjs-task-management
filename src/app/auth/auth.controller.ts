import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtResponse } from './interfaces/jwt-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtResponse> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtResponse> {
    console.log('authCredentialsDto', authCredentialsDto)
    return this.authService.signIn(authCredentialsDto);
  }
}
