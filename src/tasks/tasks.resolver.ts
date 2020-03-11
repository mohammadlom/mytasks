import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { Task } from './types/task.entity';
import { TasksService } from './tasks.service';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { TaskStatus } from 'src/models/task-status.enum';
import { User as GetUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/types/user.entity';
import { UseGuards } from '@nestjs/common';
import { MessageType } from 'src/shared/message.type';

@Resolver(Task)
export class TasksResolver {

    constructor(
        private taskService: TasksService
    ) { }

    @Mutation(returns => Task, { nullable: true })
    @UseGuards(GraphqlAuthGuard)
    async createTask(
        @Args('title') title: string,
        @Args('body') body: string,
        @Args({ name: 'due_date', type: () => String, nullable: true }) due_date: string,
        @Args({ name: 'status', type: () => String, nullable: true }) status: TaskStatus,
        @Args({ name: 'team_id', type: () => Int, nullable: true }) team_id: number,
        @GetUser() user: User
    ) {
        return this.taskService.createTask(title, body, due_date, status, user, team_id);
    }

    @Mutation(returns => Task, { nullable: true })
    @UseGuards(GraphqlAuthGuard)
    async updateTask(
        @Args({ name: 'id', type: () => Int }) id: number,
        @Args({ name: 'title', type: () => String, nullable: true }) title: string,
        @Args({ name: 'body', type: () => String, nullable: true }) body: string,
        @Args({ name: 'due_date', type: () => String, nullable: true }) due_date: string,
        @Args({ name: 'status', type: () => String, nullable: true }) status: TaskStatus,
        @GetUser() user: User
    ) {
        return this.taskService.updateTask(id, title, body, due_date, status, user);
    }

    @Mutation(returns => MessageType, { nullable: true })
    @UseGuards(GraphqlAuthGuard)
    async deleteTask(
        @Args({ name: 'id', type: () => Int }) id: number,
    ) {
        return this.taskService.deleteTask(id);
    }

    @Query(returns => [Task], { nullable: true })
    @UseGuards(GraphqlAuthGuard)
    async tasks(
        @GetUser() user: User,
        @Args({ name: 'team_id', type: () => String }) team_id: string
    ) {
        return this.taskService.getTasks(user, team_id);
    }

}
