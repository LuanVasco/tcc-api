import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';

@Module({
  imports: [BelvoHttpModule],
  providers: [BalancesService],
  controllers: [BalancesController],
})
export class BalancesModule {}
