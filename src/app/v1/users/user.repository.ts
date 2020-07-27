import * as bcrypt from 'bcrypt';
import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

export const UNIQUE_CONSTRAINT_ERROR_CODE = 23505

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      username,
      password
    } = createUserDto;

    const user = new User();

    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (parseInt(error.code) === UNIQUE_CONSTRAINT_ERROR_CODE) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async findUserByEmail(findUserByEmailDto: FindUserByEmailDto): Promise<User> {
    const { email } = findUserByEmailDto;

    const user = await this.findOne({ email });

    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
