import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class VideoInput {}

@ObjectType()
export class VideoOutput extends CoreOutput{
    @Field((type) => [String],{nullable:true})
    keys?:string[];
}