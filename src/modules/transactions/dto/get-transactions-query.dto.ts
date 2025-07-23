import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumberString,
} from 'class-validator';

export class GetTransactionsQueryDto {
  @ApiPropertyOptional({
    description: 'Data inicial para filtragem (ISO-8601)',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  date_from?: string;

  @ApiPropertyOptional({
    description: 'Data final para filtragem (ISO-8601)',
    example: '2025-06-30T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  date_to?: string;

  @ApiPropertyOptional({
    description: 'ID do link Belvo',
    example: '3db0f343-9548-4e25-97aa-93bd77a6b761',
  })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiPropertyOptional({
    description: 'Categoria da transação (campo “category” retornado)',
    example: 'Food & Groceries',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Subcategoria da transação (campo “subcategory” retornado)',
    example: 'Restaurants',
  })
  @IsOptional()
  @IsString()
  subcategory?: string;

  @ApiPropertyOptional({
    description: 'Merchant Category Code (4 dígitos)',
    example: '5411',
  })
  @IsOptional()
  @IsString()
  mcc?: string;

  @ApiPropertyOptional({
    description: 'Tipo de transação: INFLOW ou OUTFLOW',
    example: 'OUTFLOW',
    enum: ['INFLOW', 'OUTFLOW'],
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: '10' })
  @IsOptional()
  @IsNumberString()
  page_size?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;
}
