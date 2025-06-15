import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateLinkCredentialsDto {
  @ApiPropertyOptional({
    description: 'Novo usuário da instituição',
    example: 'joao321',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Nova senha da instituição',
    example: 'nova_senha',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Modo de acesso',
    example: 'recurrent',
    enum: ['single', 'recurrent'],
  })
  @IsOptional()
  @IsIn(['single', 'recurrent'])
  access_mode?: string;

  @ApiPropertyOptional({
    description: 'Tempo até considerar dados obsoletos',
    example: '90d',
  })
  @IsOptional()
  @IsString()
  stale_in?: string;
}
