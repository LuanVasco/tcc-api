import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateLinkDto {
  @ApiPropertyOptional({
    description: 'Recursos a buscar',
    example: ['accounts', 'transactions'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fetch_resources?: string[];

  @ApiPropertyOptional({
    description: 'Tempo até considerar dados obsoletos (ex: 90d)',
    example: '90d',
  })
  @IsOptional()
  @IsString()
  stale_in?: string;

  @ApiPropertyOptional({
    description: 'Frequência de atualização (ex: 6h, 12h, 24h, 7d, 30d)',
    example: '7d',
  })
  @IsOptional()
  @IsString()
  refresh_rate?: string;
}
