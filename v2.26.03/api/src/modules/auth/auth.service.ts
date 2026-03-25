import { Injectable } from '@nestjs/common';
import SigInAuthDto from './dto/sig-in-auth.dto';
import SigOutAuthDto from './dto/sig-out-auth.dto';
import RefreshAuthDto from './dto/refresh-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  sigIn(data: SigInAuthDto) {
    const { userFields } = data;
    const { email } = userFields;

    this.prisma.user.findUnique({ where: { email } });

    return 'Esta função deve criar uma nova sessão de usuário se os dados enviados correspondenrem a de um usuario válido';
  }

  sigOut(data: SigOutAuthDto) {
    const { userId, refreshToken } = data;

    this.prisma.token.update({
      where: { tokenHash: refreshToken, userId },
      data: { isRevoked: true },
    });

    return 'Esta função deve marcar o token deste user como isRevoked: true e limpar os cookies da requisição';
  }

  refresh(data: RefreshAuthDto) {
    const { refreshToken } = data;
    this.prisma.token.findUnique({ where: { tokenHash: refreshToken } });

    return 'Esta função deve gerar um novo acces token mas verificando a veracidade do refres token enviado no cookie da requisição';
  }
}
