// src/modules/institutions/institutions.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InstitutionsService } from './institutions.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetInstitutionsQueryDto } from './dto/get-institutions-query.dto';
import {
  Institution,
  InstitutionsResponse,
} from './interfaces/institution.interface';

@ApiTags('Instituições')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) // protege a rota
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as instituições' })
  async getAllInstitutions(
    @Query() query: GetInstitutionsQueryDto,
  ): Promise<InstitutionsResponse> {
    return await this.institutionsService.listInstitutions(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Seleciona uma instituição' })
  async getInstitutionById(@Param('id') id: string): Promise<Institution> {
    return await this.institutionsService.getInstitutionById(id);
  }
}
