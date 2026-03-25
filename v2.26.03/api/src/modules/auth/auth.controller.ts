import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import SigInAuthDto from './dto/sig-in-auth.dto';
import SigOutAuthDto from './dto/sig-out-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  sigIn(@Body() sigInAuthDto: SigInAuthDto) {
    return this.authService.sigIn(sigInAuthDto);
  }

  @Post()
  sigOut() {
    const sigOutAuthDto: SigOutAuthDto = {
      userId: 'Pegar o id do usuario logado no momento da requisição.',
      refreshToken: 'Pegar o token de refresh do cookie da requisição',
    };

    return this.authService.sigOut(sigOutAuthDto);
  }

  @Post()
  refresh() {
    const refreshAuthDto = {
      refreshToken: 'Pegar o refreshToken do cookie da requisição atual',
    };
    return this.authService.refresh(refreshAuthDto);
  }
}
