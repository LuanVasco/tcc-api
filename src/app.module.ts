import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinksModule } from './modules/links/links.module';
import { WidgetModule } from './modules/widget/widget.module';
import { ConsentsModule } from './modules/consents/consents.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { BalancesModule } from './modules/balance/balances.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { OwnersModule } from './modules/owners/owners.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    InstitutionsModule,
    UsersModule,
    LinksModule,
    WidgetModule,
    ConsentsModule,
    TransactionsModule,
    BalancesModule,
    AccountsModule,
    OwnersModule,
  ],
})
export class AppModule {}
