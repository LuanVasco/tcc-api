// src/modules/transactions/interfaces/transaction.interface.ts

/**
 * Representa uma única transação obtida da Belvo (Open Finance Brazil).
 */
export interface Transaction {
  /** Belvo's unique identifier for the transaction */
  id: string;

  /** Internal identifier assigned by the institution */
  internal_identification: string;

  /** Detalhes da conta associada à transação */
  account: {
    /** Belvo's unique identifier for the account */
    id: string;
    /** Link ID (identificador de link) ao qual pertence */
    link: string | null;
    /** Informação da instituição emissora */
    institution: {
      /** Código da instituição usado pela Belvo (ex: "erebor_br_retail") */
      name: string;
      /** Tipo de instituição: 'bank' | 'fiscal' | 'employment' */
      type: 'bank' | 'fiscal' | 'employment';
    };
  };

  /** Timestamp ISO-8601 de quando a transação foi registrada no Open Finance */
  collected_at: string;
  /** Timestamp ISO-8601 de quando a transação entrou na base da Belvo */
  created_at: string;
  /** Timestamp ISO-8601 de última vez que o link foi acessado para essa transação */
  last_accessed_at: string | null;

  /** Valor da transação (positivo para crédito, negativo para débito) */
  amount: number;
  /** Código de moeda ISO-4217 (ex: "BRL") */
  currency: string;

  /** Descrição enviada pela instituição para a transação */
  description: string;
  /** Descrição original sem normalização (se disponível) */
  original_description?: string;
  /** Referência ou identificador de lançamentos adicionais */
  reference?: string;

  /** Código MCC (Merchant Category Code) da transação, se disponível */
  mcc?: string | null;
  /** Categoria predefinida pela Belvo (ex: "COMPRAS", "SAQUE") */
  category?: string | null;
  /** Tipo de transação conforme o Open Finance (ex: "DEBIT", "CREDIT") */
  type?: string;

  /** Status interno da transação (ex: "posted", "pending") */
  status?: string;
}

/**
 * Estrutura de resposta paginada para listagem de transações.
 */
export interface TransactionsResponse {
  /** Total de itens disponíveis */
  count: number;
  /** URL para próxima página (ou null) */
  next: string | null;
  /** URL para página anterior (ou null) */
  previous: string | null;
  /** Lista de transações retornadas */
  results: Transaction[];
}
