import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from '../webhook.service';
import { WebhookRepository } from '../../../infrastructure/repositories/webhook.repository';
import { SetWebhookDto } from '../../dtos/set-webhook.dto';
import { SetWebhookResponse } from '../../dtos/responses/set-webhook.response';

describe('WebhookService', () => {
  let service: WebhookService;
  let repository: WebhookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: WebhookRepository,
          useValue: {
            findByName: jest.fn(),
            setWebhook: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    repository = module.get<WebhookRepository>(WebhookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setWebhook', () => {
    it('should call repository.setWebhook with correct parameters', async () => {
      const instanceName = 'test-instance';
      const setWebhookDto: SetWebhookDto = {
        webhookByEvents: true,
        webhookBase64: false,
        webhook: {
          events: ['message.upsert', 'connection.update'],
          url: 'https://example.com/webhook',
          enabled: true,
        },
      };

      const expectedResponse: SetWebhookResponse = {
        success: true,
        message: 'Webhook set successfully',
        webhook: {
          instanceName,
          webhook: setWebhookDto.webhook,
        },
      };

      jest.spyOn(repository, 'setWebhook').mockResolvedValue(expectedResponse);

      const result = await service.setWebhook(instanceName, setWebhookDto);

      expect(repository.setWebhook).toHaveBeenCalledWith(instanceName, setWebhookDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});