import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Team } from './team.enitity';
import { MessageType } from 'src/shared/message.type';
import { TeamsService } from './teams.service';
import { User as GetUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/types/user.entity';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver()
export class TeamsResolver {
    constructor(
        private teamService: TeamsService
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
        return this.teamService.deleteTeam(name, user);
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
        return user.teams;
    }
}
