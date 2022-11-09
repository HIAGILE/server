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
import { firstValueFrom, lastValueFrom, map, Observable } from "rxjs";
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

  async login({ email, password }): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        select: {
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
      console.log(code)
      console.log(process.env.GH_KEY)
      const headersRequest = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      };
      console.log(`https://github.com/login/oauth/access_token?
      code=${code}&
      client_id=7cf6aa6be0c8c9c03214&
      client_secret=${process.env.GH_KEY}`)
      const access_token = await this.httpService.get(
          `https://github.com/login/oauth/access_token?
          code=${code}&
          client_id=7cf6aa6be0c8c9c03214&
          client_secret=${process.env.GH_KEY}`,
          { headers: headersRequest });
      
      console.log(access_token);
      
      return {
        ok: true,
        token: "hello"
      }
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
      return {
        ok: true,
        token: ""
      }
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
      console.log("진입1")
      const user = this.users.create({
        email: email,
        password: password,
        role: UserRole.Client,
        name: name,
      });
      console.log("진입2")
      await this.users.save(user);
      console.log("진입3")
      const verification = await this.verifications.save(
        this.verifications.create({
          user: user
        })
      )
      console.log("진입4")
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