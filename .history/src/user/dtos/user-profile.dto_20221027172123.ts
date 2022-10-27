import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserProfileInput{
    @Field((type) => Number)
    userId:number;
}