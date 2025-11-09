import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendConfirmationEmailHandler } from './application/events/handlers/send-confirmation-email.handler';
import { RegisterUserUseCase } from './application/use-cases/user.register.use-case';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    RegisterUserUseCase,
    SendConfirmationEmailHandler,
  ],
  exports: [UserRepository, RegisterUserUseCase],
})
export class UserModule {}
