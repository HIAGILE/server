import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Friends } from "../entities/friends.entity";

@InputType()
export class UnfollowUserInput {
    @Field((type) => Number)
    userId: number;
}

@ObjectType()
export class UnfollowUserOutput extends CoreOutput {
    @Field((type) => [Friends], { nullable: true })
    friends?: Friends[];
}    