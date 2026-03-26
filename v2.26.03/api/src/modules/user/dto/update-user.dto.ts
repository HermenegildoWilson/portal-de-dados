import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { GenerateRegisterTokenDto } from './create-user.dto';

export default class UpdateUserDto extends PickType(GenerateRegisterTokenDto, [
  'email',
  'name',
  'phone',
]) {
  @IsString({ message: 'O campo username deve ser uma string.' })
  @IsOptional()
  username?: string;
}

export class UpdatePasswordDto {
  @IsString({ message: 'O campo oldPassword deve ser uma string.' })
  @IsOptional()
  oldPassword?: string;

  @IsString({ message: 'O campo newPassword deve ser uma string.' })
  @IsOptional()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
    message:
      'A password deve ter pelo menos 8 caracteres e incluir letras e números.',
  })
  newPassword?: string;
}

export class GeneratePasswordResetTokenDto {
  @IsEmail({}, { message: 'O campo email deve ser um email válido.' })
  @IsOptional()
  email?: string;
}

export class ResetPasswordDto {
  @IsString({ message: 'O campo token deve ser uma string.' })
  @IsOptional()
  token?: string;
}
