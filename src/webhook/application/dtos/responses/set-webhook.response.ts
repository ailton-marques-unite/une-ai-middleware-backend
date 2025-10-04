import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookInfo {
  @ApiProperty({
    description: 'Instance name',
    example: 'my-instance'
  })
  instanceName: string;

  @ApiProperty({
    description: 'Webhook configuration',
    example: {
      url: 'https://example.com/webhook',
      events: ['message.upsert', 'connection.update'],
      enabled: true,
      webhookByEvents: true,
      webhookBase64: false
    }
  })
  webhook: {
    url: string;
    events: string[];
    enabled: boolean;
    webhookByEvents?: boolean;
    webhookBase64?: boolean;
  };
}

export class SetWebhookResponse {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Webhook configured successfully'
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Webhook information if successfully configured',
    type: WebhookInfo
  })
  webhook?: WebhookInfo;
}
