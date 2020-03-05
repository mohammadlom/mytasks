import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';

@Module({
  providers: [TeamsResolver]
})
export class TeamsModule {}
