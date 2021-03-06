import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/types/user.entity';
import { Task } from 'src/tasks/types/task.entity';
import { Team } from 'src/teams/team.enitity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'mysqldb',
    password: '123456789',
    database: 'mytasks',
    retryAttempts: 3,
    entities: [User, Team, Task],
    synchronize: true
};