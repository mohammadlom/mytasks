import { Resolver, Query } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './team.enitity';

@Resolver()
export class TeamsResolver {
    constructor(
        private teamService: TeamsService
    ) { }

    @Query(returns => [Team], { nullable: true })
    async teams() {
        return this.teamService.getTeams();
    }
}
