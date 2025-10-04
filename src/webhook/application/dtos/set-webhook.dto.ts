import { IsBoolean, IsString, IsArray, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookConfigDto {
  @ApiProperty({
    description: 'Array of events to subscribe to',
    example: ['message.upsert', 'connection.update', 'presence.update'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  events: string[];

  @ApiProperty({
    description: 'URL where webhook events will be sent',
    example: 'https://example.com/webhook'
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Whether the webhook is enabled',
    example: true
  })
  @IsBoolean()
  enabled: boolean;
}

export class SetWebhookDto {
  @ApiPropertyOptional({
    description: 'Generate specific URLs for each event type',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  webhookByEvents?: boolean;

  @ApiPropertyOptional({
    description: 'Send files in base64 format',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  webhookBase64?: boolean;

  @ApiProperty({
    description: 'Webhook configuration object',
    type: WebhookConfigDto
  })
  @ValidateNested()
  @Type(() => WebhookConfigDto)
  webhook: WebhookConfigDto;
}
