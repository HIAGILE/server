import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { User } from "./entities/user.entity";


@Injectable()

export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly users:Repository<User>,
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
        return 
      }
}