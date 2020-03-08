import { Resolver } from '@nestjs/graphql';
import { Query, Mutation, Arg } from 'type-graphql';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {

    constructor(
        private taskService: TasksService
    ) { }

    @Query(returns => [Task], { nullable: true })
    async tasks() {
        return this.taskService.getTasks();
    }

    @Mutation(returns => Task)
    async createTask(
        @Arg('title') title: string,
        @Arg('body') body: string,
        @Arg('due_date', { nullable: true }) due_date: string,
    ) {

    }

}
