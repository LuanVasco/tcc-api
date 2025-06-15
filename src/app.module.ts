import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinksModule } from './modules/links/links.module';
import { WidgetModule } from './modules/widget/widget.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    InstitutionsModule,
    UsersModule,
    LinksModule,
    WidgetModule
  ],
})
export class AppModule {}
