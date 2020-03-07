import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository])
  ],
  providers: [TeamsResolver]
})
export class TeamsModule { }
