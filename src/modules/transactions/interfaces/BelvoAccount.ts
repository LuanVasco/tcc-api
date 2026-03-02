import { BelvoFund } from "./BelvoFund";

export interface BelvoAccount {
  id: string;
  link: string;
  name: string;
  number: string;
  type: string;
  currency: string;
  category: string;
  balance: {
    current: number;
    available: number;
  };
  created_at: string;
  collected_at: string;
  last_accessed_at: string;
  public_identification_value: string;
  internal_identification?: string;
  bank_product_id?: string;
  balance_type?: string;
  institution?: {
    name: string;
    type: string;
  };
  loan_data?: unknown;
  credit_data?: unknown;
  funds_data?: BelvoFund[];
}
