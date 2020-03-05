import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';

import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        AuthModule
    ],
    providers: [
        TasksResolver,
        TasksService
    ]
})
export class TasksModule { }
