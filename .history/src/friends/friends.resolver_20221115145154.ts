import { Resolver } from "@nestjs/graphql";
import { Friends } from "./entities/friends.entity";
import { FriendsService } from "./friends.service";


@Resolver((of) => Friends)
export class FriendsResolver{
    constructor(private readonly memberService:FriendsService){}
}