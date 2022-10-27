import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserResolver } from 'src/user/user.resolver';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class ProjectModule { }
