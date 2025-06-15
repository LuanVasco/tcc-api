import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CompleteLinkDto {
  @ApiProperty({
    description: 'ID da sessão retornado no primeiro passo',
    example: 'session-id-xyz',
  })
  @IsString()
  session: string;

  @ApiProperty({ description: 'Token MFA ou desafio', example: '123456' })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'ID do link retornado inicialmente',
    example: 'link-id-xyz',
  })
  @IsString()
  link: string;

  @ApiPropertyOptional({
    description: 'Salvar dados de sessão para futuras atualizações',
    example: true,
  })
  @IsOptional()
  @IsString()
  save_data?: boolean;
}
