import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { PubSubEngine } from 'type-graphql';
import { Team } from './team.enitity';
import { MessageType } from 'src/shared/message.type';
import { WeatherType } from 'src/shared/weather.type';
import { TeamsService } from './teams.service';
import { User as GetUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/types/user.entity';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver()
export class TeamsResolver {
    constructor(
        private teamService: TeamsService,
        @Inject('PUB_SUB') private pubSub: PubSubEngine
    ) { }

    @Mutation(returns => Team)
    @UseGuards(GraphqlAuthGuard)
    async createTeam(
        @Args('name') name: string,
        @GetUser() user: User
    ) {
        return this.teamService.createTeam(name, user);
    }

    @Mutation(returns => MessageType)
    @UseGuards(GraphqlAuthGuard)
    async deleteTeam(
        @Args('id') id: string,
        @GetUser() user: User
    ) {
        return this.teamService.deleteTeam(id, user);
    }

    @Mutation(returns => MessageType)
    @UseGuards(GraphqlAuthGuard)
    async joinTeam(
        @Args({ name: 'user_emails', type: () => [String] }) user_emails: string[],
        @Args({ name: 'team_id', type: () => String }) team_id: string,
        @GetUser() user: User
    ) {
        return this.teamService.joinTeam(user_emails, team_id);
    }

    @Query(returns => [Team], { nullable: true })
    @UseGuards(GraphqlAuthGuard)
    async teams(
        @GetUser() user: User
    ) {
        this.teamService.forecastWeather('Tehran');
        return user.teams;
    }

    @Subscription(returns => WeatherType)
    // @UseGuards(GraphqlAuthGuard)
    weather() {
        return this.pubSub.asyncIterator('weather');
    }
}
