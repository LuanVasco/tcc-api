// Interface que representa um Owner (titular de conta) retornado pela Belvo
export interface Owner {
  id: string; // Identificador único da Belvo para o owner
  name: string; // Nome do titular
  type: string; // Tipo de titular (e.g. 'individual', 'business')
  document_type: string; // Tipo de documento (e.g. 'CPF', 'CNPJ')
  document_number: string; // Número do documento do titular
  collected_at: string; // Timestamp ISO de coleta
  link: string | null; // ID do link associado a este owner
  account?: string; // Opcional: ID da conta relacionada
}

export interface OwnersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Owner[];
}
