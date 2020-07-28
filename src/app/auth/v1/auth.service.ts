import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServiceV1 } from '../../users/v1/users.service';
import { User } from '../../users/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtResponse } from '../interfaces/jwt-response.interface';

@Injectable()
export class AuthServiceV1 {
  constructor(
    private userService: UsersServiceV1,
    private jwtSertive: JwtService
  ) {
  }

  async signUp(createUserDto: CreateUserDto): Promise<JwtResponse> {
    const user = await this.userService.createUser(createUserDto);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email
    };

    return this.createAccessToken(payload);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<JwtResponse> {
    const user = await this.validateUserCredentials(authCredentials);

    const payload: JwtPayload = {
      id: user.id,
      email: user.email
    };

    return this.createAccessToken(payload);
  }

  async validateUserCredentials(authCredentials: AuthCredentialsDto): Promise<User> {
    const {
      email,
      password
    } = authCredentials

    const user = await this.userService.findUserByEmail({ email });

    if (!user) throw new UnauthorizedException();

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) throw new UnauthorizedException();

    return user;
  }

  async validateUserAdminCredentials(authCredentials: AuthCredentialsDto): Promise<User> {
    const user = await this.validateUserCredentials(authCredentials);

    if (!user.isAdmin()) throw new UnauthorizedException();

    return user;
  }

  private async createAccessToken(payload: JwtPayload): Promise<JwtResponse> {
    const accessToken: string = await this.jwtSertive.sign(payload);

    return { accessToken };
  }
}
