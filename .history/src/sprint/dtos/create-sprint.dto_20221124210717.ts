import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Sprint } from "../entities/sprint.entity";

@InputType()
export class CreateSprintInput extends PickType(Sprint, ['startDate', 'endDate','period','purpose']) {
    @Field((type) => Number)
    projectId: number;
 }

@ObjectType()
export class CreateSprintOutput extends CoreOutput{
    @Field((type) => Number,{nullable:true})
    sprintId?:number;
}
