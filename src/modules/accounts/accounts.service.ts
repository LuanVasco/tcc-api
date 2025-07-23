import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { GetAccountsQueryDto } from './dto/get-accounts-query.dto';
import { AccountsResponse, Account } from './interfaces/account.interface';

/**
 * AccountsService encapsula a comunicação com a API Belvo para Accounts.
 * ROTAS:
 *  GET /accounts/       -> lista contas vinculadas
 *  GET /accounts/:id/   -> detalhes de uma conta específica
 */
@Injectable()
export class AccountsService {
  constructor(private readonly belvo: BelvoHttpClient) {}

  async listAccounts(query: GetAccountsQueryDto): Promise<AccountsResponse> {
    const params = { ...query };
    return this.belvo.request<AccountsResponse>(
      '/accounts/',
      'GET',
      undefined,
      params,
    );
  }

  async getAccountById(id: string): Promise<Account> {
    return this.belvo.request<Account>(`/accounts/${id}/`, 'GET');
  }
}
