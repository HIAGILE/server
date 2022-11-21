import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/user/entities/user.entity";
import { Project } from "../entities/project.entity";

@InputType()
export class GetProjectInput extends PickType(Project, ['id']) { }

@ObjectType()
export class GetProjectOutput extends CoreOutput{
    @Field((type) => Project,{nullable:true})
    project?:Project;
}
