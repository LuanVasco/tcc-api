import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountsService } from './accounts.service';
import { GetAccountsQueryDto } from './dto/get-accounts-query.dto';
import { AccountsResponse, Account } from './interfaces/account.interface';

interface JwtUser {
  sub: string;
}

@ApiTags('Contas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar contas vinculadas ao link' })
  async list(
    @Req() req: Request & { user: JwtUser },
    @Query() query: GetAccountsQueryDto,
  ): Promise<AccountsResponse> {
    console.log(req.user);
    return this.service.listAccounts(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma conta pelo ID' })
  async getById(
    @Req() req: Request & { user: JwtUser },
    @Param('id') id: string,
  ): Promise<Account> {
    console.log(req.user);
    return this.service.getAccountById(id);
  }
}
