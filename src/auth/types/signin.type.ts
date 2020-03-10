import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class SignInType {
    @Field()
    email: string;

    @Field({ nullable: true })
    token: string;

    @Field()
    message: string;
}