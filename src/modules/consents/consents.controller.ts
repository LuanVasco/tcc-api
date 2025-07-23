import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsentsService } from './consents.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import type { Request } from 'express';

interface JwtUser {
  sub: string;
  document: string;
}

@ApiTags('Consents')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('consents')
export class ConsentsController {
  constructor(private readonly consentsService: ConsentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar consentimentos do usuário' })
  listConsents(@Req() req: Request & { user: JwtUser }): Promise<any> {
    // utiliza documento do usuário do JWT
    return this.consentsService.listConsents(req.user.document);
  }
}
