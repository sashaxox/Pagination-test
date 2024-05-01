/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import * as dotenv from 'dotenv';
dotenv.config();


const pg = new URL(process.env.APP_PG_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg.hostname,
      //host: "localhost",
      //port: 5432,
      port: parseInt(pg.port),
      username: pg.username,
      //username: 'postgres',
      password: pg.password,
      //password: '1',
      database: pg.pathname.slice(1),
      //database: "test_pagination",
      ssl: pg.searchParams.get('sslmode') !== 'disable',
      autoLoadEntities: true,
      // it is unsafe to use synchronize: true for schema synchronization on production
      synchronize: false, // process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      useUTC: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
