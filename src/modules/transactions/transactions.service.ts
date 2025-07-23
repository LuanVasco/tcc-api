// src/modules/transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import {
  TransactionsResponse,
  Transaction,
} from './interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  /**
   * Lista transações do usuário autenticado, com paginação e filtros.
   * @param userId Sub (id) do usuário extraído do JWT
   * @param query Parâmetros de query (date_from, date_to, page, page_size, etc.)
   * @returns Promise de TransactionsResponse contendo transações paginadas
   */
  async listTransactions(
    userId: string,
    query: Record<string, any>,
  ): Promise<TransactionsResponse> {
    const params = { ...query, external_id: userId };
    return this.belvoClient.request<TransactionsResponse>(
      '/transactions/',
      'GET',
      undefined,
      params,
    );
  }

  /**
   * Recupera uma transação específica pelo id, garantindo pertença ao usuário.
   * @param userId Sub (id) do usuário extraído do JWT
   * @param id ID da transação a ser recuperada
   * @returns Promise de Transaction detalhada
   */
  async getTransactionById(userId: string, id: string): Promise<Transaction> {
    const params = { external_id: userId };
    return this.belvoClient.request<Transaction>(
      `/transactions/${id}/`,
      'GET',
      undefined,
      params,
    );
  }
}
