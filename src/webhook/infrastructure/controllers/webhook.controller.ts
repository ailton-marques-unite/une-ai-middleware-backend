import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { WebhookService } from '../../application/services/webhook.service';
import { SetWebhookDto } from '../../application/dtos/set-webhook.dto';
import { SetWebhookResponse } from '../../application/dtos/responses/set-webhook.response';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get('/find/:instanceName')
  @ApiOperation({ summary: 'Find webhook by instance name' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ 
    status: 200,
    description: 'The webhook has been successfully found.'
  })
  findByName(@Param('instanceName') instanceName: string) {
    return this.webhookService.findByName(instanceName);
  }

  @Post('/set/:instanceName')
  @ApiOperation({ 
    summary: 'Set webhook for an instance',
    description: 'Configure webhook settings for a specific instance to receive real-time events from Evolution API'
  })
  @ApiParam({ 
    name: 'instanceName', 
    description: 'The name of the instance to configure webhook for',
    example: 'my-instance'
  })
  @ApiBody({ 
    description: 'Webhook configuration object',
    type: SetWebhookDto,
    examples: {
      'full-config': {
        summary: 'Full webhook configuration',
        description: 'Complete webhook setup with all options',
        value: {
          webhookByEvents: true,
          webhookBase64: false,
          webhook: {
            events: ['message.upsert', 'connection.update', 'presence.update'],
            url: 'https://example.com/webhook',
            enabled: true
          }
        }
      },
      'minimal-config': {
        summary: 'Minimal webhook configuration',
        description: 'Basic webhook setup with required fields only',
        value: {
          webhook: {
            events: ['message.upsert'],
            url: 'https://myapp.com/webhook',
            enabled: true
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200,
    description: 'The webhook has been successfully configured',
    type: SetWebhookResponse
  })
  @ApiResponse({ 
    status: 400,
    description: 'Bad request - Invalid webhook configuration'
  })
  @ApiResponse({ 
    status: 500,
    description: 'Internal server error - Failed to configure webhook'
  })
  setWebhook(@Param('instanceName') instanceName: string, @Body(ValidationPipe) setWebhookDto: SetWebhookDto) {
    return this.webhookService.setWebhook(instanceName, setWebhookDto);
  }
}
