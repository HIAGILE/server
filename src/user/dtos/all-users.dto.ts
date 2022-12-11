import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Friends } from "src/friends/entities/friends.entity";
import { User } from "../entities/user.entity";

@InputType()
export class AllUsersInput {}

@ObjectType()
export class AllUsersOutput extends CoreOutput {
    
    @Field((type) => [Friends], { nullable: true })
    friends?: Friends[];

    @Field((type) =>[User], { nullable: true })
    users?: User[];

    @Field((type) => [Friends], { nullable: true })
    inMyFriends?: Friends[];
}