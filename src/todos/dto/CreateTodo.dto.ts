import { IsString } from "class-validator";
import { Todo } from "../entities/todos.entity";

export class CreateTodo extends Todo {

    @IsString()
    readonly Description: string;
    readonly published: boolean;
    readonly authorId: number;
}