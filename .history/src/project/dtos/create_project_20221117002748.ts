import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Project } from "../entities/project.entity";

@InputType()
export class CreateProjectInput extends PickType(Project, ['name', 'gitURL','code']) { }

@ObjectType()
export class CreateProjectOutput extends CoreOutput{
    @Field((type) => Number,{nullable:true})
    projectId?:number;
}
