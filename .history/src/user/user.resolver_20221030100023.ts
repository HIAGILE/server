import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
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


    @Query((returns) => User)
    @Role(['Any'])
    me(@AuthUser() authUser:User){
        return authUser;
    }

    @Mutation((returns))
}
