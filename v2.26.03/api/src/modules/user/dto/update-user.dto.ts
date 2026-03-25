import { PickType } from '@nestjs/mapped-types';
import { GenerateRegisterTokenDto } from './create-user.dto';

export default class UpdateUserDto extends PickType(GenerateRegisterTokenDto, [
  'email',
  'name',
  'phone',
]) {
  username?: string;
}

export class UpdatePasswordDto {
  oldPassword?: string;
  newPassword?: string;
}

export class GeneratePasswordResetTokenDto {
  email?: string;
}

export class ResetPasswordDto {
  token?: string;
}
