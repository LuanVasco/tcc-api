import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';

/**
 * OwnersModule agrupa o controller e service de Owners
 */
@Module({
  imports: [BelvoHttpModule],
  providers: [OwnersService],
  controllers: [OwnersController],
})
export class OwnersModule {}
