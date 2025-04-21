// src/modules/institutions/institutions.module.ts
import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';

@Module({
  imports: [BelvoHttpModule], // Importa o módulo de infra
  providers: [InstitutionsService],
  controllers: [InstitutionsController],
})
export class InstitutionsModule {}
