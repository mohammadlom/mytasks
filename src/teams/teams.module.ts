import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository])
  ],
  providers: [TeamsResolver, TeamsService]
})
export class TeamsModule { }
