import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetBalancesQueryDto {
  @ApiPropertyOptional({ description: 'Tamanho da página', example: '10' })
  @IsOptional()
  @IsNumberString()
  page_size?: string;

  @ApiPropertyOptional({ description: 'Número da página', example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'ID do link',
    example: '3db0f343-9548-4e25-97aa-93bd77a6b761',
  })
  @IsOptional()
  @IsString()
  link?: string;
}
