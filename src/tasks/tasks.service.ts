import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TeamRepository } from 'src/teams/team.repository';
import { User } from 'src/auth/types/user.entity';
import { Task } from './types/task.entity';
import { TaskStatus } from 'src/models/task-status.enum';
import { UsersRepository } from 'src/auth/user.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        @InjectRepository(TeamRepository)
        private teamRepository: TeamRepository,
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository
    ) { }

    async createTask(
        title: string,
        body: string,
        due_date: string,
        status: string,
        user: User,
        team_id: number
    ): Promise<Task> {
        const task = new Task();
        task.title = title;
        task.body = body;
        task.user = user;
        if (due_date) {
            task.due_date = new Date(due_date);
        }
        if (status) {
            task.status = TaskStatus[status];
        } else {
            task.status = TaskStatus.TODO;
        }
        if (team_id) {
            const team = await this.teamRepository.findOne(team_id);
            if (!team)
                throw new BadRequestException("Invalid team");
            task.team = team;
        }

        return task.save();
    }

    async updateTask(
        id: number,
        title: string,
        body: string,
        due_date: string,
        status: string,
        user: User,
    ): Promise<Task> {
        const task = await this.taskRepository.findOne({ id, user: user });

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        if (title) task.title = title;
        if (body) task.body = body;
        if (due_date) task.due_date = new Date(due_date);
        if (status) task.status = TaskStatus[status];

        return await task.save();

    }

    async deleteTask(id: number) {
        if (await this.taskRepository.delete({ id })) {
            return { message: "task successfully deleted" };
        }
        throw new BadRequestException("Something went wrong!");
    }

    async getTasks(user: User, team_id: string) {
        const team = await this.teamRepository.findOne(team_id);
        if (team_id) {
            return this.taskRepository.find({ team });
        }
        return (await this.taskRepository.find()).filter((task) => {
            task.user = user;
        });
    }
}
