// src/modules/institutions/institutions.service.ts
import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import {
  InstitutionsResponse,
  Institution,
} from './interfaces/institution.interface';

@Injectable()
export class InstitutionsService {
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  // Busca todas as instituições
  listInstitutions(
    params?: Record<string, string>,
  ): Promise<InstitutionsResponse> {
    return this.belvoClient.request('/institutions/', 'GET', undefined, params);
  }

  // Busca uma instituição específica pelo ID
  getInstitutionById(id: string): Promise<Institution> {
    return this.belvoClient.request(`/institutions/${id}/`, 'GET');
  }
}
