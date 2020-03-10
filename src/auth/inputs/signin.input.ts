import { InputType, Field } from "type-graphql";
import { User } from "../types/user.entity";

@InputType({ description: "user signin input" })
export class SignInInput implements Partial<User> {
    @Field()
    email: string;

    @Field()
    password: string;
}