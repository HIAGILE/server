import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Friends } from "src/friends/entities/friends.entity";
import { User } from "../entities/user.entity";

@InputType()
export class AllUsersInput {}

@ObjectType()
export class AllUsersOutput extends CoreOutput {

    @Field((type) => [User], { nullable: true })
    Friends?: Friends[];

    @Field((type) =>[User], { nullable: true })
    Users?: User[];
}