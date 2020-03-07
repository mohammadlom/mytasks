import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthResolver],
  exports: [TypeOrmModule]
})
export class AuthModule { }
