import { InputType, Field } from "type-graphql";
import { User } from "../types/user.entity";

@InputType({ description: "user signup input" })
export class SignUpInput implements Partial<User> {
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    mobile: string;

    @Field()
    password: string;
}