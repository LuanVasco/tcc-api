import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { GetOwnersQueryDto } from './dto/get-owners-query.dto';
import { OwnersResponse, Owner } from './interfaces/owner.interface';

/**
 * OwnersService encapsula a lógica de comunicação com a API Belvo para Owners.
 * Cada método corresponde a uma rota da Belvo:
 *  - listOwners: GET /owners/?link=&page_size=&page=
 *  - getOwnerById: GET /owners/{id}/
 */
@Injectable()
export class OwnersService {
  constructor(private readonly belvo: BelvoHttpClient) {}

  /**
   * Lista titulares (Owners) de contas conectadas.
   * @param query Query params (link, page_size, page)
   */
  async listOwners(query: GetOwnersQueryDto): Promise<OwnersResponse> {
    const params = { ...query };
    return this.belvo.request<OwnersResponse>(
      '/owners/',
      'GET',
      undefined,
      params,
    );
  }

  /**
   * Recupera detalhes de um titular específico pelo ID.
   * @param id ID do Owner na Belvo
   */
  async getOwnerById(id: string): Promise<Owner> {
    return this.belvo.request<Owner>(`/owners/${id}/`, 'GET');
  }
}
