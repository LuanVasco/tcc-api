import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsISO8601 } from 'class-validator';

export class FindInternalTransactionsDto {
  @ApiPropertyOptional({ example: 'Investments & Savings' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Data inicial de criação (no sistema local)',
    example: '2025-07-01',
  })
  @IsOptional()
  @IsISO8601()
  created_from?: string;

  @ApiPropertyOptional({
    description: 'Data final de criação (no sistema local)',
    example: '2025-07-31',
  })
  @IsOptional()
  @IsISO8601()
  created_to?: string;
}
