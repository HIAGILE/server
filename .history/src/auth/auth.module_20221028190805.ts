import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from 'src/jwt/jwt.service';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
    imports:[UserModule],
    providers:[{
        provide:APP_GUARD,
        useClass:AuthGuard,
    },JwtService]
})
export class AuthModule {}
