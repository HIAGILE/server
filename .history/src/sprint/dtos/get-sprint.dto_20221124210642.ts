import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Sprint } from "../entities/sprint.entity";

@InputType()
export class GetSprintInput extends PickType(Sprint, ['id']) { }

@ObjectType()
export class GetSprintOutput extends CoreOutput{
    @Field((type) => Sprint,{nullable:true})
    sprint?:Sprint;
}
