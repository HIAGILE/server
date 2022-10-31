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
import { MailModule } from './mail/mail.module';
import * as Joi from 'joi';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'developer' ? '.env.developer' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema:Joi.object({
        NODE_ENV: Joi.string().valid('developer', 'production', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        AWS_KEY: Joi.string().required(),
        AWS_SECRET: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 아폴로 드라이버 옵션
      autoSchemaFile: true, // Schema 파일 생성 여부 옵션
      introspection:true,
      persistedQueries:false,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      synchronize: true,
      logging:
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test',
      entities: [User,Project,Sprint,Member,ToDoList,Verification],
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
  CommonModule,
  MailModule.forRoot({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN_NAME,
    fromEmail: process.env.MAILGUN_FROM_EMAIL,
  })],
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
