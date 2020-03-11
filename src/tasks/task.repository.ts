import { Repository, EntityRepository } from "typeorm";
import { Task } from "./types/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}