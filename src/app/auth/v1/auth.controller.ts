import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthServiceV1 } from './auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto'
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtResponse } from '../interfaces/jwt-response.interface';

@Controller('v1/auth')
export class AuthControllerV1 {
  constructor(private authService: AuthServiceV1) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<JwtResponse> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<JwtResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}
