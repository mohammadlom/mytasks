import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { MinLength } from 'class-validator';
import { Team } from '../../teams/team.enitity';
import { Task } from '../../tasks/types/task.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => String)
    id: string;

    @Column()
    @Field()
    fullName: string;

    @MinLength(6)
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
        eager: true,
        cascade: true
    })
    @JoinTable()
    @Field(type => [Team])
    teams: Team[];

    @OneToMany(type => Task, task => task.user, { cascade: true })
    @Field(type => [Task])
    tasks: Task[];


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}