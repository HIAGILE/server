import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver((of)=>User)
export class UserResolver{
    constructor(private readonly userService:UserService){}

    @Query((returns) => [User])
    users():Promise<User[]>{
        return this.userService.usersAll();
    }

    @Mutation((returns) => LoginOutput)
    async login(@Args('input') loginInput:LoginInput):Promise<LoginOutput>{
        return this.userService.login(loginInput)
    }
}
