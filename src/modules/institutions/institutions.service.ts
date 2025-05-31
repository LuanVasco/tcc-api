// src/modules/institutions/institutions.service.ts
import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { GetInstitutionsQueryDto } from './dto/get-institutions-query.dto';
import {
  InstitutionsResponse,
  Institution,
} from './interfaces/institution.interface';

@Injectable()
export class InstitutionsService {
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  // Busca todas as instituições
  listInstitutions(
    query: GetInstitutionsQueryDto,
  ): Promise<InstitutionsResponse> {
    const params = this.cleanAndFormatParams(query);
    return this.belvoClient.request('/institutions/', 'GET', undefined, params);
  }

  // Busca uma instituição específica pelo ID
  getInstitutionById(id: string): Promise<Institution> {
    return this.belvoClient.request(`/institutions/${id}/`, 'GET');
  }

  private cleanAndFormatParams(
    dto: Record<string, any>,
  ): Record<string, string> {
    const formatted: Record<string, string> = {};

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formatted[key] = Array.isArray(value) ? value.join(',') : String(value);
      }
    });

    return formatted;
  }
}
