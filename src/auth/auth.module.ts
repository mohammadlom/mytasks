import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';
import { Team } from 'src/entities/team.enitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task, Team])
  ],
  providers: [AuthResolver],
  exports: [TypeOrmModule]
})
export class AuthModule { }
