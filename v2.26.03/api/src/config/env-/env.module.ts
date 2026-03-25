import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import envConfig from './env.config';
import { envValidationSchema } from './validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema: envValidationSchema,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
