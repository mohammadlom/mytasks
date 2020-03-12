import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    HttpService
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { Team } from './team.enitity';
import { MessageType } from 'src/shared/message.type';
import { User } from 'src/auth/types/user.entity';
import { UsersRepository } from 'src/auth/user.repository';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(TeamRepository)
        private readonly teamRepository: TeamRepository,
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private httpService: HttpService
    ) { }

    async createTeam(
        name: string,
        user: User
    ): Promise<Team> {
        const team = new Team();

        if (!(await this.teamRepository.find({ name }))) {
            throw new BadRequestException("Duplicate team name");
        }

        team.name = name;

        try {
            await team.save();
            user.teams.push(team);
            user.save();
            return team;
        } catch (error) {
            throw new InternalServerErrorException("Somethin went wrong!");
        }
    }

    async deleteTeam(id: string, user: User): Promise<MessageType> {
        const team = await this.teamRepository.findOne({ id });
        if (!team) {
            throw new NotFoundException("Team not found");
        }
        if (
            user.teams.filter((userTeam) => {
                return team.id === userTeam.id;
            }).length == 0
        ) {
            throw new UnauthorizedException("You're not permitted");
        }

        await this.teamRepository.delete(id);
        return {
            message: "Team Successfully deleted!"
        };
    }

    async joinTeam(user_emails: string[], team_id: string) {

        const team = await this.teamRepository.findOne(team_id);
        if (!team) {
            throw new BadRequestException("Something went wrong.");
        }
        const t = this;
        user_emails.forEach(user_email => {
            const user = t.userRepository.findOne({ email: user_email });
            if (!user) {
                throw new NotFoundException("User not found.");
            }
            user.then((found) => {
                found.teams.push(team);
                found.save();
            });
        });

        return {
            message: "Users joined successfully"
        };
    }

    async forecastWeather(city: string) {
        const apiKey = 'YOUR_API_KEY';
        const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        );
    }
}
