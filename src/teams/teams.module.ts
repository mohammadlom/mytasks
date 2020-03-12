import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { TeamsService } from './teams.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository]),
    AuthModule,
    HttpModule
  ],
  providers: [
    TeamsResolver,
    TeamsService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    }

  ],
  exports: [TypeOrmModule]
})
export class TeamsModule { }
