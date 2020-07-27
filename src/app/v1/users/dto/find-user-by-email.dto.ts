import {
  IsNotEmpty,
  IsString,
  Matches
} from 'class-validator';

export const EMAIL_VALIDATION_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
export const EMAIL_VALIDATION_MESSAGE = 'invalid email'

export class FindUserByEmailDto {
  @IsNotEmpty()
  @IsString()
  @Matches(
    EMAIL_VALIDATION_REGEX,
    { message: EMAIL_VALIDATION_MESSAGE }
  )
  email: string;
}
