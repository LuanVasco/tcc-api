import { Controller, Get, Query, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import type { Request } from 'express';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';
import { Transaction, TransactionsResponse } from './interfaces/transaction.interface';

interface JwtUser {
  sub: string;
  document: string;
}

@ApiTags('Transactions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar transações do usuário autenticado' })
  async list(
    @Req() req: Request & { user: JwtUser },
    @Query() query: GetTransactionsQueryDto,
  ): Promise<TransactionsResponse> {
    const userId = req.user.sub;
    return this.transactionsService.listTransactions(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma transação pelo ID' })
  async getById(
    @Req() req: Request & { user: JwtUser },
    @Param('id') id: string,
  ): Promise<Transaction> {
    const userId = req.user.sub;
    return this.transactionsService.getTransactionById(userId, id);
  }
}
