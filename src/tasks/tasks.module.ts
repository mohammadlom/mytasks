import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { TaskRepository } from './task.repository';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository]),
        AuthModule,
        TeamsModule
    ],
    providers: [
        TasksResolver,
        TasksService
    ]
})
export class TasksModule { }
