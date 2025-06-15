// src/modules/widget/widget.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WidgetService } from './widget.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WidgetTokenResponseDto } from './dto/widget-token-response.dto';

@ApiTags('Widget')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('token')
  @ApiOperation({ summary: 'Gerar token de acesso para o Widget da Belvo' })
  async getWidgetToken(
    @Req()
    req: Request & {
      user: {
        sub: string;
        name: string;
        document: string;
      };
    },
  ): Promise<WidgetTokenResponseDto> {
    return this.widgetService.generateWidgetToken(req.user);
  }
}
