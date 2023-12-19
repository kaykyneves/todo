import { IsString } from "class-validator";
import { Todo } from "../entities/todos.entity";

export class UpdateTodo extends Todo{

    @IsString({
        message: 'Todo Must be a String',
      })
    Description: string;
}