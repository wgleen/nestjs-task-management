import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';

export const PASSWORD_VALIDATION_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
export const PASSWORD_VALIDATION_MESSAGE = 'password too weak'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    PASSWORD_VALIDATION_REGEX,
    { message: PASSWORD_VALIDATION_MESSAGE }
  )
  @IsNotEmpty()
  password: string;
}
