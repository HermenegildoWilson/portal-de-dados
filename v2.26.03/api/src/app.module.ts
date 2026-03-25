import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SensorModule } from './modules/sensor/sensor.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UserModule, SensorModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
