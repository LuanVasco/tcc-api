/**
 * Representa uma conta bancária ou cartão retornado pela API Belvo.
 */
export interface Account {
  id: string;
  name: string; // Nome ou label da conta (e.g. Conta Corrente)
  type: string; // Tipo de conta (e.g. 'checking', 'savings')
  subtype?: string; // Subtipo, se aplicável (e.g. 'personal', 'business')
  institution: string; // Código da instituição (e.g. 'erebor_br_retail')
  holder: string; // Nome do titular
  number: string; // Número da conta
  currency: string; // Moeda (ISO-4217)
  collected_at: string; // Timestamp ISO de coleta
  last_accessed_at: string; // Timestamp ISO de último acesso
}

export interface AccountsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Account[];
}
