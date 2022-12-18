import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { ToDoList } from "src/todolist/entities/todolist.entity";

@InputType()
export class UpdateMonitorInput extends PickType(ToDoList, ['id']) {

    @Field((type) => Number)
    memberId:number;

    @Field((type) => Number)
    rate: number;
 }

@ObjectType()
export class UpdateMonitorOutput extends CoreOutput{}
