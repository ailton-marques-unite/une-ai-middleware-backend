import { Injectable, NotFoundException } from '@nestjs/common';
import { WebhookRepository } from '../../infrastructure/repositories/webhook.repository';
import { SetWebhookDto } from '../dtos/set-webhook.dto';
import { SetWebhookResponse } from '../dtos/responses/set-webhook.response';

@Injectable()
export class WebhookService {
  constructor(private readonly webhookRepository: WebhookRepository) {}

  async findByName(instanceName: string) {
    const webhook = await this.webhookRepository.findByName(instanceName);
    if (!webhook) {
      throw new NotFoundException(`Webhook not found for instance: ${instanceName}`);
    }
    return webhook;
  }

  async setWebhook(instanceName: string, setWebhookDto: SetWebhookDto): Promise<SetWebhookResponse> {
    return this.webhookRepository.setWebhook(instanceName, setWebhookDto);
  }
}
