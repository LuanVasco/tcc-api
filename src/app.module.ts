import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InstitutionsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
