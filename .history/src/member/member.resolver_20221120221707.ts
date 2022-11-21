import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/user/entities/user.entity";
import { AddMembersInput, AddMembersOutput } from "./dtos/add-members.dto";
import { Member } from "./entities/member.entity";
import { MemberService } from "./member.service";

@Resolver((of) => Member)
export class MemberResolver{
    constructor(private readonly memberService:MemberService){}

    @Mutation((returns) => AddMembersOutput)
    @Role(['Any'])
    async addFriends(
        @AuthUser() authUser:User,
        
        @Args('input') addMembersInput: AddMembersInput): Promise<AddMembersOutput> {
        return this.memberService.addMembers(authUser,addMembersInput);
    }
}