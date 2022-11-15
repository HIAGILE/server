import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Project } from "../entities/project.entity";

@InputType()
export class CreateProjectInput extends PickType(Project, ['name', 'gitURL']) { }

@ObjectType()
export class CreateProjectOutput extends CoreOutput{}
