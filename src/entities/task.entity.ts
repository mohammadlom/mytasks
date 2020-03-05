import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { TaskStatus } from "src/models/task-status.enum";
import { User } from "./user.entity";
import { Team } from "./team.enitity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column('date')
    due_date: Date;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {
        eager: true
    })
    user: User;

    @OneToMany(type => Team, team => team.tasks)
    team: Team;



}