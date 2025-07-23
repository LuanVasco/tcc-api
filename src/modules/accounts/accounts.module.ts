import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

/**
 * AccountsModule agrupa controller e service de Accounts
 */
@Module({
  imports: [BelvoHttpModule],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
