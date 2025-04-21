// src/modules/institutions/institutions.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import {
  Institution,
  InstitutionsResponse,
} from './interfaces/institution.interface';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  async getAllInstitutions(
    @Query() query: Record<string, string>,
  ): Promise<InstitutionsResponse> {
    // Logando todos os parâmetros de consulta de forma mais detalhada
    console.log('Query Parameters:', query);
    return await this.institutionsService.listInstitutions(query);
  }

  @Get(':id')
  async getInstitutionById(@Param('id') id: string): Promise<Institution> {
    return await this.institutionsService.getInstitutionById(id);
  }
}
