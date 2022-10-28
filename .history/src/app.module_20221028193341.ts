import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { MemberModule } from './member/member.module';
import { SprintModule } from './sprint/sprint.module';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { User } from './user/entities/user.entity';
import { Project } from './project/entities/project.entity';
import { Sprint } from './sprint/entities/sprint.entity';
import { Member } from './member/entities/member.entity';
import { ToDoList } from './todolist/entities/todolist.entity';
import { Verification } from './user/entities/verification.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'developer' ? '.env.developer' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 아폴로 드라이버 옵션
      autoSchemaFile: true, // Schema 파일 생성 여부 옵션
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mac',
      password: '    ',
      database: 'hiagile',
      entities: [User,Project,Sprint,Member,ToDoList,Verification],
      logging: 
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test',
      synchronize: true,
    }),
  UserModule,
  ProjectModule,
  MemberModule,
  SprintModule,
  JwtModule.forRoot({
    privateKey: process.env.PRIVATE_KEY,
  }),
  TodolistModule,
  AuthModule,
  CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
