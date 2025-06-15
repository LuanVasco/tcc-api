import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  document: string;

  birthday: string;
  password: string;
  id: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
  complement: string;
  createdAt: string;
  updatedAt: string;
}
