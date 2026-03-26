import { IsNotEmpty, IsString } from 'class-validator';

export default class SigOutAuthDto {
  @IsString({ message: 'O campo userId deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo userId é obrigatório.' })
  userId!: string;

  @IsString({ message: 'O campo refreshToken deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo refreshToken é obrigatório.' })
  refreshToken!: string;
}
