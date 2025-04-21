import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InstitutionsModule,
    UsersModule
  ],
})
export class AppModule {}
