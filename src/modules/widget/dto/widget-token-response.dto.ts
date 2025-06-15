import { ApiProperty } from '@nestjs/swagger';

export class WidgetTokenResponseDto {
  @ApiProperty({ description: 'Token de acesso para o widget' })
  access: string;

  @ApiProperty({ description: 'Token de refresh para o widget' })
  refresh: string;
}
