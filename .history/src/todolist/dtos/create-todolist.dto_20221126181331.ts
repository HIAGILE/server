import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Project } from "src/project/entities/project.entity";
import { Sprint } from "src/sprint/entities/sprint.entity";
import { User } from "src/user/entities/user.entity";
import { ToDoList } from "src/todolist/entities/todolist.entity";

@InputType()
export class CreateToDoListInput extends PickType(ToDoList, ['title','description','status']) {
    @Field((type) => Number)
    sprintId: number;
 }

@ObjectType()
export class CreateToDoListOutput extends CoreOutput{
    @Field((type) => Number,{nullable:true})
    toDoListId?:number;
}
