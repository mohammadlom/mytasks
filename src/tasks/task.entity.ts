import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { TaskStatus } from "src/models/task-status.enum";
import { User } from "../auth/types/user.entity";
import { Team } from "../teams/team.enitity";
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    body: string;

    @Column('datetime')
    @Field()
    due_date: Date;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    @Field()
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {
        eager: true
    })
    @Field(type => User)
    user: User;

    @OneToMany(type => Team, team => team.tasks)
    @Field(type => Team)
    team: Team;
}