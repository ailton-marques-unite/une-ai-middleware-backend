import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhookService } from './application/services/webhook.service';
import { WebhookController } from './infrastructure/controllers/webhook.controller';
import { WebhookRepository } from './infrastructure/repositories/webhook.repository';

@Module({
  imports: [HttpModule],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookRepository],
})
export class WebhookModule {}
