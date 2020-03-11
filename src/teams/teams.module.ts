import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository]),
    AuthModule
  ],
  providers: [TeamsResolver, TeamsService],
  exports: [TypeOrmModule]
})
export class TeamsModule { }
