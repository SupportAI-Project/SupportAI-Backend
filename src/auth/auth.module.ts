import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JWT_EXPIRATION_TIME } from '@app/common/constants/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
