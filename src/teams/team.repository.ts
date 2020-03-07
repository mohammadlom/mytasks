import { Repository, EntityRepository } from "typeorm";
import { Team } from "./team.enitity";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {

}