import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
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
            'role'
        )
    }
}