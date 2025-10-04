import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from '../webhook.controller';
import { WebhookService } from '../../../application/services/webhook.service';
import { SetWebhookDto } from '../../../application/dtos/set-webhook.dto';

describe('WebhookController', () => {
  let controller: WebhookController;
  let service: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: WebhookService,
          useValue: {
            findByName: jest.fn(),
            setWebhook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('setWebhook', () => {
    it('should call webhookService.setWebhook with correct parameters', async () => {
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

      const expectedResponse = {
        success: true,
        message: 'Webhook set successfully',
        webhook: {
          instanceName,
          webhook: setWebhookDto.webhook,
        },
      };

      jest.spyOn(service, 'setWebhook').mockResolvedValue(expectedResponse);

      const result = await controller.setWebhook(instanceName, setWebhookDto);

      expect(service.setWebhook).toHaveBeenCalledWith(instanceName, setWebhookDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});