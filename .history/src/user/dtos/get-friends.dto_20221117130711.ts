import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@ArgsType()
export class GetFriendsInput {
    @Field((type) => Number)
    userId: number;
}

@ObjectType()
export class GetFriendsOutput extends CoreOutput {
    @Field((type) =>[User], { nullable: true })
    friends?: User[];
}