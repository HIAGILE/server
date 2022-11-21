import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
class ProjectMemberInput {
    @Field((type) => Number)
    userId: number;

    @Field((type) => String)
    role: string;
}

@InputType()
export class AddMembersInput {

    @Field((type) => Number)
    projectId: number;

    @Field((type) => [ProjectMemberInput])
    members: ProjectMemberInput[];
}

@ObjectType()
export class AddMembersOutput extends CoreOutput {}