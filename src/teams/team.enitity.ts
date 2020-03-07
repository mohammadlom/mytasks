import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(type => Task, task => task.team)
    tasks: Task[];
}