/**
 * Representa o saldo de uma conta retornado pela API Belvo.
 */
export interface Balance {
  /** Identificador único do saldo */
  id: string;
  /** Valor disponível na conta */
  available: number;
  /** Saldo corrente (total) */
  current: number;
  /** Saldo pendente */
  pending?: number;
  /** Limite de crédito, quando aplicável */
  limit?: number;
  /** Código da moeda ISO-4217 (ex: 'BRL') */
  currency: string;
  /** Timestamp ISO de quando os dados foram coletados */
  collected_at: string;
  /** Timestamp ISO de última vez que a Belvo acessou o link para atualizar o saldo */
  last_accessed_at: string;
  /** Conta associada */
  account: {
    /** ID da conta na Belvo */
    id: string;
    /** ID do link ao qual a conta pertence */
    link: string | null;
  };
}

export interface BalancesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Balance[];
}
