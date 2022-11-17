import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class GetFriendsInput {
    @Field((type) => Number)
    userId: number;
}

@ObjectType()
export class GetFriendsOutput extends CoreOutput {
    @Field((type) =>[User], { nullable: true })
    friends?: User[];
}