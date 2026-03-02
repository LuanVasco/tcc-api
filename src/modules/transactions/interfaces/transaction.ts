import { BelvoAccount } from "./BelvoAccount";

export interface Transaction {
  id: string;
  amount: number;
  type: 'INFLOW' | 'OUTFLOW';
  status: 'PROCESSED' | 'PENDING' | 'UNCATEGORIZED';
  currency: string;
  reference: string | null;
  description: string | null;
  value_date: string;
  accounting_date: string;
  created_at: string;
  collected_at: string;
  balance: number;
  category: string | null;
  subcategory?: string | null;
  merchant?: {
    name?: string;
    logo?: string;
    website?: string;
  };
  observations?: string | null;
  internal_identification?: string;
  account: BelvoAccount;
}
