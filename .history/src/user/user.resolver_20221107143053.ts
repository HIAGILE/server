import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { CreateAccountInput, CreateAccountOutput, ValidateAccountInput, ValidateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver((of) => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query((returns) => [User])
    users(): Promise<User[]> {
        return this.userService.usersAll();
    }

    @Mutation((returns) => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput);
    }

    @Query((returns) => User)
    @Role(['Any'])
    me(@AuthUser() authUser: User) {
        return authUser;
    }

    @Query((returns) => ValidateAccountOutput)
    async validateAccount(@Args('input') validateAccountInput:ValidateAccountInput):Promise<ValidateAccountOutput>{
        return this.userService.validateAccount(validateAccountInput);
    }


    @Mutation((returns) => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{
        return await this.userService.createAccount(createAccountInput);
    }
}
