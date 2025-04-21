import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BelvoHttpClient } from './belvo.http-client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [BelvoHttpClient],
  exports: [BelvoHttpClient],
})
export class BelvoHttpModule {}
