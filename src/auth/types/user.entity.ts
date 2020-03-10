import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Team } from '../../teams/team.enitity';
import { Task } from '../../tasks/task.entity';
import { ObjectType, Field, Int } from 'type-graphql';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    fullName: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ length: 11 })
    @Field()
    mobile: string;

    @Column({ default: false })
    @Field()
    isActive: boolean;

    @ManyToMany(type => Team, {
        eager: true
    })
    @JoinTable()
    @Field(type => [Team])
    teams: Team[];

    @OneToMany(type => Task, task => task.user)
    @Field(type => [Task])
    tasks: Task[];


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}