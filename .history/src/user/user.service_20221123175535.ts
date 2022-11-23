import { CacheModule, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Not, Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput, ValidateAccountInput, ValidateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { GitHubOAuthInput, GitHubOAuthOutput } from "./dtos/github-oauth-login.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { User, UserRole } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { KakaoOAuthInput, KakaoOAuthOutput } from "./dtos/kakao-oauth-login.dto";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, interval, lastValueFrom, map, Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { GetFriendsInput, GetFriendsOutput } from "./dtos/get-friends.dto";
import { AddFriendsInput, AddFriendsOutput } from "./dtos/add-firends.dto";
import { Friends } from "src/friends/entities/friends.entity";
import { AllUsersOutput } from "./dtos/all-users.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";


@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Friends)
    private readonly friends: Repository<Friends>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly httpService: HttpService,

  ) { }

  async usersAll(): Promise<User[]> {
    return this.users.find({
      relations: ["projects","members"]
    });
  }

  async AllUsers(authUser:User): Promise<AllUsersOutput> {
    try {
      const myFriends = await this.friends.find({
        where: {
          user:{
            id:authUser.id
          },
        }
      });
      const users =  await this.users.find({
        where:{
          id:Not(authUser.id)
        }
      });

      if (users)
      {
        return {
          ok: true,
          users: users,
          friends: myFriends,
        }
      }
    }
    catch (e) {
      return {
        ok: false,
        error: e
      }
    }
  }

  async addFriends({userId}:AddFriendsInput,authUser:User):Promise<AddFriendsOutput>{
    try{
      // AuthUser의 정보를 가져온다.
      const user = await this.users.findOne({
        where: {
          id: authUser.id,
        },
      });
      // AuthUser가 없다면 에러를 리턴한다.
      if(!user){
        return {
          ok: false,
          error: "User Not Found"
        }
      }

      this.friends.save(this.friends.create({
        verified:true,
        user: user,
        friendId: userId
      }));
      
      const result = await this.getFriends({userId:authUser.id});
      return {
        ok: true,
        friends: result.friends,
      }
    }
    catch(e){
      return {
        ok:false,
        error:e
      }
    }
  }


  async getFriends({userId}:GetFriendsInput): Promise<GetFriendsOutput> {
    try{
      const user = await this.users.findOne({
        select: {
          friends: true,
        },
        where: {
          id: userId,
        },
        relations: ["friends"]
      });
      if(!user){
        return {
          ok: false,
          error: "User Not Found"
        }
      }
      let friendsList = [];
      for(const friend of user.friends){
        const user = await this.users.findOne({
          select: {
            id:true,
            email:true,
            name:true,
            role:true,
            projects:true,
            verified:true,
            profileUrl:true,
          },
          where: {
            id: friend.friendId,
          },
          relations: ["projects"]
        });

        if (user){
          friendsList.push(user);
        }
      }
      return {
        ok: true,
        friends:friendsList,
      }
    }
    catch(e){
      return {
        ok:false,
        error:e
      }
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({
        select: {
          name: true,
          email: true,
          password: true,
          id: true,
          role: true,
          verified: true,
          profileUrl: true,
        },
        where: {
          id: id,
        },
      });
      return {
        ok: true,
        user: user,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'User Not Found',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        select: {
          id:true,
          email: true,
          password: true,
          name: true,
          verified:true,
          role:true,
        },
        where: {
          email: email
        }
      })
      if (!user) {
        return {
          ok: false,
          error: '계정이 존재하지 않아요. 이메일을 확인해주세요.'
        }
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong Password',
        };
      }
      // make a JWT and giv it to the user
      const token = this.jwtService.sign({ 
        id: user.id,
        email: user.email,
        name:user.name,
        verified:user.verified,
        role:user.role,
      });
      return {
        ok: true,
        token: token,
      };
    }
    catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async validateAccount({ email }: ValidateAccountInput): Promise<ValidateAccountOutput> {
    try {
      const user = await this.users.findOne({
        select: {
          email: true,
        },
        where: {
          email: email
        }
      });

      if (user) {
        return {
          ok: false,
          error: "이미 등록된 이메일입니다."
        }
      }

      return {
        ok: true
      }
    }
    catch (e) {
      return {
        ok: false,
        error: "내부 시스템 에러가 발생했습니다."
      }
    }

  }

  async githubLogin({ code }: GitHubOAuthInput): Promise<GitHubOAuthOutput> {
    try {
      if (!code) {
        return {
          ok: false,
          error: "코드가 입력되지 않았습니다."
        }
      }
      const headersRequest = {
        'Accept': 'application/json',
      };
      const access = await lastValueFrom(this.httpService.get(
        "https://github.com/login/oauth/access_token",
        {
          params: {
            code: code,
            client_id: "7cf6aa6be0c8c9c03214",
            client_secret: "a0e601d7b0f63a78092a4e644174bd29bc364b4d"
          },
          headers: {
            'Accept': 'application/json',
          }
        }
      )
      );
      const access_token = access.data.access_token

      if (access_token == "") {
        throw "접근 토큰 오류 발생"
      }

      const user_data = await lastValueFrom(this.httpService.get(
        "https://api.github.com/user",
        {
          headers: { "Authorization": `Bearer ${access_token}` }
        }
      ))
      const user_email = await lastValueFrom(this.httpService.get(
        "https://api.github.com/user/emails",
        {
          headers: { "Authorization": `Bearer ${access_token}` }
        }
      ))
      const email = user_email.data[0].email

      const user = await this.users.findOne({
        where: {
          email: email
        },
      });
      if (!user) {
        const newUser = this.users.create({
          email: email,
          role: UserRole.Client,
          name: user_data.data.name,
        });
        await this.users.save(newUser);

        const token = this.jwtService.sign({ id: newUser.id, email: newUser.email });
        return {
          ok: true,
          token: token,
        };
      }

      const token = this.jwtService.sign({ id: user.id, email: user.email });
      return {
        ok: true,
        token: token,
      };
    }
    catch (e) {
      return {
        ok: false,
        error: e,
        token: ""
      }
    }
  }

  async kakaoLogin({ code }: KakaoOAuthInput): Promise<KakaoOAuthOutput> {
    try {
      if (!code) {
        return {
          ok: false,
          error: "코드가 입력되지 않았습니다."
        }
      }
      const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const access = await lastValueFrom(this.httpService.get(
        "https://kauth.kakao.com/oauth/token",
        {
          params: {
            code: code,
            grant_type: "authorization_code",
            client_id: "b3a9beab04e6e23fce4144d6733c69ab",
            redirect_uri: "http://127.0.0.1:3000/social/kakao",
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      )
      );

      const access_token = access.data.access_token
      if (access_token == "") {
        throw "접근 토큰 오류 발생"
      }

      const user_data = await lastValueFrom(this.httpService.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }
      ))
      const email = user_data.data.kakao_account.email

      const user = await this.users.findOne({
        where: {
          email: email
        },
      });
      if (!user) {
        const newUser = this.users.create({
          email: email,
          role: UserRole.Client,
          name: user_data.data.name,
        });
        await this.users.save(newUser);
        const token = this.jwtService.sign({ id: newUser.id, email: newUser.email });
        return {
          ok: true,
          token: token,
        };
      }

      const token = this.jwtService.sign({ id: user.id, email: user.email });
      return {
        ok: true,
        token: token,
      };
    }
    catch (e) {
      return {
        ok: false,
        error: e,
        token: ""
      }
    }
  }

  async createAccount({ name, email, password }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const user = this.users.create({
        email: email,
        password: password,
        role: UserRole.Client,
        name: name,
      });
      await this.users.save(user);
      const verification = await this.verifications.save(
        this.verifications.create({
          user: user
        })
      )

      this.mailService.sendVerificationEmail(user.email, verification.code);
      return {
        ok: true
      }
    }
    catch (e) {
      return {
        ok: false,
        error: e
      }
    }
  }

  async editProfile(authUser, { email, password, name, profileUrl }: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(
        {
          select:{
            email: true,
            password: true,
            verified: true,
            role: true,
            name: true,
            profileUrl: true,
          },
          where:
          {
            id: authUser.id
          }
        }
      );
      if (!user.verified){
        return {
          ok: false,
          error: "이메일 인증을 발송했습니다. 이메일 인증을 먼저 진행해주세요."
        }
      } 
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.delete({
          user: { id: user.id }
        });
        const verification = await this.verifications.save(
          this.verifications.create({
            user: user
          })
        )
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }
      if (name) {
        user.name = name;
      }
      if (profileUrl) {
        user.profileUrl = profileUrl;
      }
      await this.users.save(user);
      return {
        ok: true,
      }
    }
    catch (e) {
      return {
        ok: false,
        error: e
      }
    }
  }
}