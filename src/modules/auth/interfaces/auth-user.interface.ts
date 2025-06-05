export interface AuthUserInterface {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  document?: string;
  birthday?: Date;
  cep?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  complement?: string;
  createdAt: Date;
  updatedAt: Date;
}
