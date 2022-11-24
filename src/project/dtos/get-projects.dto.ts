import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Project } from "../entities/project.entity";

@InputType()
export class GetProjectsInput extends PickType(User, ['id']) { }

@ObjectType()
export class GetProjectsOutput extends CoreOutput{
    @Field((type) => [Project],{nullable:true})
    projects?:Project[];
}
