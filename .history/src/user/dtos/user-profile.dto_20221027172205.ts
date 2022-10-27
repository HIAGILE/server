import { ArgsType, Field } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ArgsType()
export class UserProfileInput{
    @Field((type) => Number)
    userId:number;
}

export class UserProfileOutput{
    @Field((type) => User,{nullable:true})
    user:User;
}