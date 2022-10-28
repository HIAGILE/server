import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Verification } from '../user/entities/verification.entity';

export const HiAgileTest = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'hiagile',
  synchronize: true,
  logging: false,
  entities: [User, Verification],
});
