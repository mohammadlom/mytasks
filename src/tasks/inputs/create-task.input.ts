import { InputType, Field } from "type-graphql";
import { Task } from "../task.entity";

@InputType({ description: "New task data" })
export class CreateTaskInput implements Partial<Task> {
    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}