import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initDataSource } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(initDataSource())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
