import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [BelvoHttpModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
