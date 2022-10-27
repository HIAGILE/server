import { Resolver } from "@nestjs/graphql";
import { Member } from "./entities/member.entity";
import { MemberService } from "./member.service";

@Resolver((of) => Member)
export class MemberResolver{
    constructor(private readonly memberService:MemberService){}
}