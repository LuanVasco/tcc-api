// src/modules/institutions/institutions.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [UsersController],
})
export class UsersModule {}
