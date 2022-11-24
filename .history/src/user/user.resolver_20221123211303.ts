import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { AddFriendsInput, AddFriendsOutput } from "./dtos/add-firends.dto";
import { AllUsersOutput } from "./dtos/all-users.dto";
import { CreateAccountInput, CreateAccountOutput, ValidateAccountInput, ValidateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { GetFriendsInput, GetFriendsOutput } from "./dtos/get-friends.dto";
import { GitHubOAuthInput, GitHubOAuthOutput } from "./dtos/github-oauth-login.dto";
import { KakaoOAuthInput, KakaoOAuthOutput } from "./dtos/kakao-oauth-login.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerificationAgainOutput } from "./dtos/verification-again.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver((of) => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query((returns) => [User])
    users(): Promise<User[]> {
        return this.userService.usersAll();
    }

    @Query((returns) => GetFriendsOutput)
    @Role(['Any'])
    async getFriends(@Args('input') getFriendsInput:GetFriendsInput): Promise<GetFriendsOutput> {
        return this.userService.getFriends(getFriendsInput);
    }

    @Mutation((returns) => AddFriendsOutput)
    @Role(['Any'])
    async addFriends(
        @AuthUser() authUser:User,
        @Args('input') addFriendsInput: AddFriendsInput): Promise<AddFriendsOutput> {
        return this.userService.addFriends(addFriendsInput,authUser);
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

    @Query((returns) => UserProfileOutput)
    @Role(['Any'])
    async userProfile(
        @Args() userProfileInput: UserProfileInput,
    ): Promise<UserProfileOutput> {
        return await this.userService.findById(userProfileInput.userId);
    }

    @Mutation((returns) => EditProfileOutput)
    @Role(['Any'])
    async editProfile(
        @AuthUser() authUser:User,
        @Args('input') editMyProfileInput:EditProfileInput,
    ):Promise<EditProfileOutput>{
        return await this.userService.editProfile(authUser,editMyProfileInput);
    }

    @Query((returns) => ValidateAccountOutput)
    async validateAccount(@Args('input') validateAccountInput:ValidateAccountInput):Promise<ValidateAccountOutput>{
        return await this.userService.validateAccount(validateAccountInput);
    }

    @Mutation((returns) => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{
        return await this.userService.createAccount(createAccountInput);
    }

    @Mutation((returns) => GitHubOAuthOutput)
    async githubLogin(@Args('input') gitHubOAuthInput:GitHubOAuthInput):Promise<GitHubOAuthOutput>{
        return await this.userService.githubLogin(gitHubOAuthInput);
    }

    @Mutation((returns) => KakaoOAuthOutput)
    async kakaoLogin(@Args('input') kakaoOAuthInput:KakaoOAuthInput):Promise<KakaoOAuthOutput>{
        return await this.userService.kakaoLogin(kakaoOAuthInput);
    }

    @Query((returns) => AllUsersOutput)
    @Role(['Any'])
    async allUsers(
        @AuthUser() authUser:User,
    ):Promise<AllUsersOutput>{
        return await this.userService.AllUsers(authUser);
    }

    @Mutation((returns) => VerificationAgainOutput)
    @Role(['Any'])
    async verificationAgain(
        @AuthUser() authUser:User,

    ):Promise<VerificationAgainOutput>{
        return await this.userService.verificationAgain(authUser);
    }

    @Mutation((returns) => VerifyEmailOutput)
    async verifyEmail(
        @Args('input') verifyEmailInput: VerifyEmailInput,
    ): Promise<VerifyEmailOutput> {
        return await this.userService.verifyEmail(verifyEmailInput.code);
    }
}
