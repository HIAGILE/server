import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AllowedRoles } from "./role.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly refletor:Reflector,
        // private readonly jwtService:JwtService,
        // private readonly userService:UserService,
    ){}

    async canActivate(context: ExecutionContext){
        const roles = this.refletor.get<AllowedRoles>(
            'roles',
            context.getHandler(),
        );
        if (!roles){
            return true;
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const token = gqlContext.token;
        if(token){
            
        }
    }
}