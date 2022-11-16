import { CacheModule, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
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


@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly httpService: HttpService,

  ) { }

  async usersAll(): Promise<User[]> {
    return this.users.find({
      relations: ["projects"]
    });
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
      console.log(user)
      // make a JWT and giv it to the user
      const token = this.jwtService.sign({ id: user.id, email: user.email });
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
      console.log(access_token)
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
      console.log(user_data)
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
}