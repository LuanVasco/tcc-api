import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class GetLinksQueryDto {
  @ApiPropertyOptional({ description: 'Tamanho da página', example: 10 })
  @IsOptional()
  @IsNumberString()
  page_size?: string;

  @ApiPropertyOptional({ description: 'Número da página', example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'ID externo (seu identificador de usuário)',
    example: '1234',
  })
  @IsOptional()
  @IsString()
  external_id?: string;

  @ApiPropertyOptional({
    description: 'Instituição (código)',
    example: 'banco_sandbox',
  })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiPropertyOptional({
    description: 'Status do link',
    example: 'valid',
    enum: ['valid', 'invalid', 'unconfirmed', 'token_required'],
  })
  @IsOptional()
  @IsIn(['valid', 'invalid', 'unconfirmed', 'token_required'])
  status?: string;
}
