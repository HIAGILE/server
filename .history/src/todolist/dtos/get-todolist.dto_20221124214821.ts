import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { ToDoList } from "../entities/todolist.entity";

@InputType()
export class GetToDoListInput extends PickType(Sprint, ['id']) { }

@ObjectType()
export class GetToDoListOutput extends CoreOutput{
    @Field((type) => ToDoList,{nullable:true})
    toDoList?:ToDoList;
}
