import { Module } from '@nestjs/common';
import { BelvoHttpModule } from 'src/infra/http/belvo/belvo.module';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';

@Module({
  imports: [BelvoHttpModule],
  providers: [WidgetService],
  controllers: [WidgetController],
})
export class WidgetModule {}
