import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable
} from '@nestjs/common';
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').secret
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload

    const user = await this.usersService.findUserByEmail({ email });

    return user;
  }
}
