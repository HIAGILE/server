import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Sprint } from "../entities/sprint.entity";
import { Project } from "src/project/entities/project.entity";

@InputType()
export class GetSprintsInput extends PickType(Project, ['id']) { }

@ObjectType()
export class GetSprintsOutput extends CoreOutput{
    @Field((type) => [Sprint],{nullable:true})
    sprints?:Sprint[];
}
