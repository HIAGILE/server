import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { CreateAccountInput, CreateAccountOutput, ValidateAccountInput, ValidateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { User, UserRole } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";


@Injectable()

export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly users:Repository<User>,
        @InjectRepository(Verification)
        private readonly verifications: Repository<Verification>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ){}

    async usersAll():Promise<User[]>{
        return this.users.find({
            relations:["projects"]
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

      async login({email,password}):Promise<LoginOutput>{
        try{
          const user = await this.users.findOne({
            select:{
              email:true,
              password:true,
              name:true,
            },
            where:{
              email:email
            }
          })
          if (!user){
            return {
              ok:false,
              error:'계정이 존재하지 않아요. 이메일을 확인해주세요.'
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
        catch(e){
          console.log(e);
          throw new InternalServerErrorException();
        }
      }

      async validateAccount({email}:ValidateAccountInput):Promise<ValidateAccountOutput>{
        try{
          const user = await this.users.findOne({
            select:{
              email:true,
            },
            where:{
              email:email
            }
          });
  
          if (!user)
          {
            return {
              ok:false,
              error:"이미 등록된 이메일입니다."
            }
          }
  
          return {
            ok:true
          }
        }
        catch(e){
          return{
            ok:false,
            error:"내부 시스템 에러가 발생했습니다."
          }
        }
        
      }

      async createAccount({name,email,password}:CreateAccountInput):Promise<CreateAccountOutput>{
        try{
          const user = this.users.create({
            email:email,
            password:password,
            role:UserRole.Client,
            name:name,
          });
          await this.users.save(user);
  
          const verification = await this.verifications.save(
            this.verifications.create({
              user:user
            })
          )
          this.mailService.sendVerificationEmail(user.email,verification.code);
          return {
            ok:true
          }
        }
        catch(e){
          return{
            ok:false,
            error:"회원가입 진행중 내부 에러가 발생했습니다."
          }
        }      
      }
}