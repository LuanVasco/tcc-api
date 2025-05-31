import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'luan@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123!',
    description: 'User password (should be hashed before saving)',
  })
  password: string;

  @ApiProperty({ example: 'Luan Godoy', description: 'Full name of the user' })
  name: string;

  @ApiPropertyOptional({
    example: '(11) 91234-5678',
    description: 'Optional phone number in Brazilian format',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: '12345678900',
    description: 'Optional CPF (no punctuation)',
  })
  document?: string;

  @ApiPropertyOptional({
    example: '1995-04-30',
    type: String,
    description: 'Birth date in YYYY-MM-DD format',
  })
  birthday?: string;

  // Endereço
  @ApiPropertyOptional({
    example: '01001-000',
    description: 'CEP (postal code)',
  })
  cep?: string;

  @ApiPropertyOptional({ example: 'Rua Exemplo', description: 'Street name' })
  street?: string;

  @ApiPropertyOptional({
    example: '123',
    description: 'House or apartment number',
  })
  number?: string;

  @ApiPropertyOptional({ example: 'São Paulo', description: 'City name' })
  city?: string;

  @ApiPropertyOptional({
    example: 'SP',
    description: 'State abbreviation (UF)',
  })
  state?: string;

  @ApiPropertyOptional({
    example: 'Bloco B, Apto 23',
    description: 'Complementary address info',
  })
  complement?: string;
}
