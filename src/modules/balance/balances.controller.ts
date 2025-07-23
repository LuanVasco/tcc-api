import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BalancesService } from './balances.service';
import { GetBalancesQueryDto } from './dto/get-balances-query.dto';
import { Balance, BalancesResponse } from './interfaces/balance.interface';

interface JwtUser {
  sub: string;
  document: string;
}

@ApiTags('Saldos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar saldos de contas do usuário autenticado' })
  async list(@Query() query: GetBalancesQueryDto): Promise<BalancesResponse> {
    return this.balancesService.listBalances(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um saldo pelo ID' })
  async getById(@Param('id') id: string): Promise<Balance> {
    return this.balancesService.getBalanceById(id);
  }
}
