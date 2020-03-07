import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Team } from '../teams/team.enitity';
import { Task } from '../tasks/task.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 11 })
    mobile: string;

    @Column({ default: false })
    isActive: boolean;

    @ManyToMany(type => Team, {
        eager: true
    })
    @JoinTable()
    teams: Team[];

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];

}