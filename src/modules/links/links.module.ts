// src/modules/links/links.module.ts
import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
  imports: [BelvoHttpModule],
  providers: [LinksService],
  controllers: [LinksController],
})
export class LinksModule {}
