import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver((of)=>User)
export class UserResolver{
    constructor(private readonly userService:UserService){}

    @Query((returns) => [User])
    users():Promise<User[]>{
        return this.userService.usersAll();
    }
}
