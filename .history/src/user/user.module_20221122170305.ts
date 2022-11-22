import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from 'src/friends/entities/friends.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User,Verification,Friends]),HttpModule],
    providers:[UserResolver,UserService],
    exports:[UserService]
})
export class UserModule {}
