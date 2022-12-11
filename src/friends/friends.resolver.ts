import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User } from "src/user/entities/user.entity";
import { FollowUserInput, FollowUserOutput } from "./dtos/follow-user.dto";
import { UnfollowUserInput, UnfollowUserOutput } from "./dtos/unfollow-user.dto";
import { Friends } from "./entities/friends.entity";
import { FriendsService } from "./friends.service";


@Resolver((of) => Friends)
export class FriendsResolver{
    constructor(private readonly friendsService:FriendsService){}

    // @Query((returns) => [User])
    // @Role(['Any'])
    // async getFriends(): Promise<User[]> {
    //     return await this.friendsService.usersAll();
    // }

    // @Query((returns) => User)
    // @Role(['Any'])
    // async getFriend(
    //     @Args() userProfileInput: UserProfileInput,
    // ): Promise<User> {
    //     return await this.friendsService.findById(userProfileInput.userId);
    // }

    @Mutation((returns) => FollowUserOutput)
    @Role(['Any'])
    async followUser(
        @AuthUser() authUser:User,
        @Args('input') followUserInput: FollowUserInput): Promise<FollowUserOutput>{
        return await this.friendsService.followUser(authUser,followUserInput);
    }

    @Mutation((returns) => UnfollowUserOutput)
    @Role(['Any'])
    async unfollowUser(
        @AuthUser() authUser:User,
        @Args('input') unfollowUserInput: UnfollowUserInput): Promise<UnfollowUserOutput>{
            return await this.friendsService.unfollowUser(authUser,unfollowUserInput);
    }
    
    @Mutation((returns) => FollowUserOutput)
    @Role(['Any'])
    async acceptUser(
        @AuthUser() authUser:User,
        @Args('input') followUserInput: FollowUserInput): Promise<FollowUserOutput>{
            return await this.friendsService.acceptUser(authUser,followUserInput);
    }

}