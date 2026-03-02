export interface BelvoFund {
  name: string;
  type: string;
  balance: number;
  percentage: number;
  collected_at: string;
  public_identifications: PublicIdentification[];
}

export interface PublicIdentification {
  name: 'CNPJ' | 'SUSEP';
  value: string;
}
