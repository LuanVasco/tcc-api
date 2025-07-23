import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { BalancesResponse, Balance } from './interfaces/balance.interface';

@Injectable()
export class BalancesService {
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  /**
   * Lista saldos de contas do usuário autenticado.
   */
  async listBalances(query: Record<string, any>): Promise<BalancesResponse> {
    const params = { ...query };
    return this.belvoClient.request<BalancesResponse>(
      '/br/balances/',
      'GET',
      undefined,
      params,
    );
  }

  /**
   * Obtém detalhes de um único saldo pelo ID.
   */
  async getBalanceById(id: string): Promise<Balance> {
    return this.belvoClient.request<Balance>(
      `/br/balances/${id}/`,
      'GET',
      undefined,
    );
  }
}
