import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsIn } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'Código da instituição',
    example: 'banco_sandbox',
  })
  @IsString()
  institution: string;

  @ApiProperty({ description: 'Usuário da instituição', example: 'joao123' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Senha da instituição', example: 'senha_segura' })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'Modo de acesso (single ou recurrent)',
    example: 'single',
    enum: ['single', 'recurrent'],
  })
  @IsOptional()
  @IsIn(['single', 'recurrent'])
  access_mode?: string;

  @ApiPropertyOptional({
    description: 'Array de recursos a buscar (em lowercase)',
    example: ['accounts', 'transactions'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fetch_resources?: string[];

  @ApiPropertyOptional({
    description: 'Onde armazenar as credenciais na Belvo',
    example: 'store',
    enum: ['store', 'none'],
  })
  @IsOptional()
  @IsIn(['store', 'none'])
  credentials_storage?: string;

  @ApiPropertyOptional({
    description: 'Quanto tempo os dados devem ficar armazenados na Belvo (ex: 90d)',
    example: '90d',
  })
  @IsOptional()
  @IsString()
  stale_in?: string;
}
