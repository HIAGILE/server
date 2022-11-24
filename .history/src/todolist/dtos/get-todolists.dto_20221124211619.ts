import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Project } from "src/project/entities/project.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { ToDoList } from "../entities/todolist.entity";

@InputType()
export class GetToDoListsInput extends PickType(Sprint, ['id']) { }

@ObjectType()
export class GetToDoListsOutput extends CoreOutput{
    @Field((type) => [ToDoList],{nullable:true})
    toDoLists?:ToDoList[];
}
