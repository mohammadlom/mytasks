import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './inputs/create-task.input';

@Resolver(Task)
export class TasksResolver {

    constructor(
        private taskService: TasksService
    ) { }

    @Query(returns => [Task], { nullable: true })
    async tasks() {
        return this.taskService.getTasks();
    }

    @Mutation(returns => Task, { nullable: true })
    async createTask(
        @Args('createTaskInput') createTaskInput: CreateTaskInput
    ) {

    }

}
