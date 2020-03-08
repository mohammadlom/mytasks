import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(TeamRepository)
        private readonly teamRepository: TeamRepository
    ) { }

    async getTeams() {
        return await this.teamRepository.find();
    }
}
