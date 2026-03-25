import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService) {}

  get apiUrl(): number {
    return this.config.get<number>('api.url')!;
  }

  get apiPort(): number {
    return this.config.get<number>('api.port')!;
  }

  get apiHost(): string {
    return this.config.get<string>('api.host')!;
  }

  get appUrl(): string {
    return this.config.get<string>('app.url')!;
  }

  get appDeepLinking(): string {
    return this.config.get<string>('app.deepLinking')!;
  }

  get databaseUrl(): string {
    return this.config.get<string>('database.url')!;
  }

  get mailUser(): string {
    return this.config.get<string>('mail.user')!;
  }

  get mailPass(): string {
    return this.config.get<string>('mail.pass')!;
  }

  get jwtAccessSecret(): string {
    return this.config.get<string>('jwt.accessSecret')!;
  }

  get jwtRefreshSecret(): string {
    return this.config.get<string>('jwt.refreshSecret')!;
  }

  get jwtAccessExpiresIn(): StringValue {
    return this.config.get<string>('jwt.accessExpiresIn') as StringValue;
  }

  get jwtRefreshExpiresIn(): StringValue {
    return this.config.get<string>('jwt.refreshExpiresIn') as StringValue;
  }

  get swaggerEnabled(): boolean {
    return this.config.get<boolean>('swagger.enabled') ?? true;
  }

  get swaggerPath(): string {
    return this.config.get<string>('swagger.path') ?? 'docs';
  }

  get rateLimitTtl(): number {
    return this.config.get<number>('throttler.ttl') ?? 60;
  }

  get rateLimitLimit(): number {
    return this.config.get<number>('throttler.limit') ?? 100;
  }

  get authRateLimitTtl(): number {
    return this.config.get<number>('throttler.authTtl') ?? 60;
  }

  get authRateLimitLimit(): number {
    return this.config.get<number>('throttler.authLimit') ?? 5;
  }

  get rateLimitBlockDuration(): number {
    return this.config.get<number>('throttler.blockDuration') ?? 180000;
  }
}
