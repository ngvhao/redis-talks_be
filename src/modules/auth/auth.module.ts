import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/domain/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/services/auth.service';
import { LoginUseCase } from './application/use-cases/auth.login.use-case';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AuthController } from './interface/auth.controller';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, LoginUseCase, AuthRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
