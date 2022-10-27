import { Resolver } from "@nestjs/graphql";
import { Member } from "./entities/member.entity";

@Resolver((of) => Member)
export class MemberResolver{
    
}