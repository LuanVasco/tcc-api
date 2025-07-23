import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { ConsentsService } from './consents.service';
import { ConsentsController } from './consents.controller';

@Module({
  imports: [BelvoHttpModule],
  providers: [ConsentsService],
  controllers: [ConsentsController],
})
export class ConsentsModule {}
