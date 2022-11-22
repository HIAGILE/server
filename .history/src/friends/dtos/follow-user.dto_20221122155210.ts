import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Friends } from "../entities/friends.entity";

@InputType()
export class FollowUserInput {
    @Field((type) => Number)
    userId: number;
}

@ObjectType()
export class FollowUserOutput extends CoreOutput {}    