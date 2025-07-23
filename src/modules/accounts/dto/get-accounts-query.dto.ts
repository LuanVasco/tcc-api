import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsNumberString } from 'class-validator';

export class GetAccountsQueryDto {
  @ApiPropertyOptional({
    description: 'ID do link associado',
    example: 'cfe13e7f-83ba-420e-9465-e85e51c25021',
  })
  @IsOptional() @IsUUID()
  link?: string;

  @ApiPropertyOptional({ description: 'Tamanho da página', example: '10' })
  @IsOptional() @IsNumberString()
  page_size?: string;

  @ApiPropertyOptional({ description: 'Número da página', example: '1' })
  @IsOptional() @IsNumberString()
  page?: string;
}