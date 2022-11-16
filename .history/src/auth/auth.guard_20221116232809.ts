import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { JwtService } from "src/jwt/jwt.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { AllowedRoles } from "./role.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly reflector:Reflector,
        private readonly jwtService:JwtService,
        private readonly userService:UserService,
        ){}
    async canActivate(context: ExecutionContext){
        
        const roles  = this.reflector.get<AllowedRoles>('role',context.getHandler());
        console.log("token1")
        if(!roles)
        {
            return true;
        }
        console.log("token2")
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const token = gqlContext.token;
        console.log("token3")
        console.log(token)
        if (token) {
            const decoded = this.jwtService.verify(token.toString());
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
              const { user } = await this.userService.findById(decoded['id']);
              if (user) {
                gqlContext['user'] = user;
                if (roles.includes('Any')) {
                  return true;
                }
                return roles.includes(user.role);
              }
            }
        }
        return false;
    }
}