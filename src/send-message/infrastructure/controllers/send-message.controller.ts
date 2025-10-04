import { Controller, Post, Body, Param } from '@nestjs/common';
import { SendMessageService } from '../../application/services/send-message.service';
import { CreateSendMessageDto } from '../../application/dtos/create-send-message.dto';
import { 
  ApiOperation, 
  ApiBody, 
  ApiResponse, 
  ApiTags, 
  ApiParam } from '@nestjs/swagger';
import { SendPlainTextMessageResponse } from '../../application/dtos/responses/send-plain-text-message.response';
import { CreateSendStatusMessageDto } from '../../application/dtos/create-send-status-message.dto';
import { SendStatusMessageResponse } from '../../application/dtos/responses/send-status-message.response';
import { SendMediaMessageResponse } from '../../application/dtos/responses/send-media-message.response';
import { CreateSendMediaMessageDto } from '../../application/dtos/create-send-media-message.dto';
import { CreateSendWhatsappAudioMessageDto } from '../../application/dtos/create-send-whatsapp-audio-message.dto';
import { SendWhatsappAudioMessageResponse } from '../../application/dtos/responses/send-whatsapp-audio-message.response';
import { CreateSendStickerMessageDto } from '../../application/dtos/create-send-sticker-message.dto';
import { SendStickerMessageResponse } from '../../application/dtos/responses/send-sticker-message.response';
import { CreateSendLocationMessageDto } from '../../application/dtos/create-send-location-message.dto';
import { SendLocationMessageResponse } from '../../application/dtos/responses/send-location-message.response';
import { CreateSendContactMessageDto } from '../../application/dtos/create-send-contact-message.dto';
import { SendContactMessageResponse } from '../../application/dtos/responses/send-contact-message.response';
import { CreateSendReactionMessageDto } from '../../application/dtos/create-send-reaction-message.dto';
import { SendReactionMessageResponse } from '../../application/dtos/responses/send-reaction-message.response';
import { CreateSendPollMessageDto } from '../../application/dtos/create-send-poll-message.dto';
import { SendPollMessageResponse } from '../../application/dtos/responses/send-poll-message.response';
import { CreateSendListMessageDto } from '../../application/dtos/create-send-list-message.dto';
import { SendListMessageResponse } from '../../application/dtos/responses/send-list-message.response';
import { CreateSendButtonsMessageDto } from '../../application/dtos/create-send-buttons-message.dto';
import { SendButtonsMessageResponse } from '../../application/dtos/responses/send-buttons-message.response';

@ApiTags('Send Message')
@Controller('message')
export class SendMessageController {
  constructor(private readonly sendMessageService: SendMessageService) {}

  @Post('/sendText/:instanceName')
  @ApiOperation({ summary: 'Send a plain text message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendMessageDto,
    description: 'The plain text message to send',
    examples: { 
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "text": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ],
          "quoted": {
            "key": {
              "id": "<string>"
            },
            "message": {
              "conversation": "<string>"
            }
          }
        }
      },
      'minimal-config': {
        summary: 'Minimal message configuration',
        description: 'Basic message setup with required fields only',
        value: {
          "number": "<string>",
          "text": "<string>",
          "delay": 60,
          "linkPreview": true,
          "mentionsEveryOne": false,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendPlainTextMessageResponse,
    description: 'The plain text message was sent successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The plain text message was not sent for instance name'
  })
  sendPlainTextMessage(
    @Param('instanceName') instanceName: string, 
    @Body() createSendMessageDto: CreateSendMessageDto) {
    return this.sendMessageService.sendPlainTextMessage(instanceName, createSendMessageDto);
  }

  @Post('/sendStatus/:instanceName')
  @ApiOperation({ summary: 'Send a status message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendStatusMessageDto,
    description: 'The status message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "type": "<string>",
          "content": "<string>",
          "caption": "<string>",
          "backgroundColor": "<string>",
          "font": 123,
          "allContacts": true,
          "statusJidList": ["Array of remoteJIDs"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendStatusMessageResponse,
    description: 'The status message was sent successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The status message was not found for instance name'
  })
  sendStatusMessage(@Param('instanceName') instanceName: string, @Body() createSendMessageDto: CreateSendStatusMessageDto) {
    return this.sendMessageService.sendStatusMessage(instanceName, createSendMessageDto);
  }

  @Post('/sendMedia/:instanceName')
  @ApiOperation({ summary: 'Send a media message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendMediaMessageDto,
    description: 'The media message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "mediaType": "<string>",
          "media": "<string>",
          "caption": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ],
          "quoted": {
            "key": {
              "id": "<string>"
            },
            "message": {
              "conversation": "<string>"
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendMediaMessageResponse,
    description: 'The media message was sent successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The media message was not found for instance name' })
  sendMediaMessage(@Param('instanceName') instanceName: string, @Body() createSendMediaMessageDto: CreateSendMediaMessageDto) {
    return this.sendMessageService.sendMediaMessage(instanceName, createSendMediaMessageDto);
  }

  @Post('/sendWhatsappAudio/:instanceName')
  @ApiOperation({ summary: 'Send a whatsapp audio message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendWhatsappAudioMessageDto,
    description: 'The whatsapp audio message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "audio": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendWhatsappAudioMessageResponse,
    description: 'The whatsapp audio message was sent successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'The whatsapp audio message was not found for instance name' })
  sendWhatsappAudioMessage(@Param('instanceName') instanceName: string, @Body() createSendWhatsappAudioMessageDto: CreateSendWhatsappAudioMessageDto) {
    return this.sendMessageService.sendWhatsappAudioMessage(instanceName, createSendWhatsappAudioMessageDto);
  }
  
  @Post('/sendSticker/:instanceName')
  @ApiOperation({ summary: 'Send a sticker message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendStickerMessageDto,
    description: 'The sticker message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "sticker": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendStickerMessageResponse,
    description: 'The sticker message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The sticker message was not found for instance name' })
  sendStickerMessage(@Param('instanceName') instanceName: string, @Body() createSendStickerMessageDto: CreateSendStickerMessageDto) {
    return this.sendMessageService.sendStickerMessage(instanceName, createSendStickerMessageDto);
  }

  @Post('/sendLocation/:instanceName')
  @ApiOperation({ summary: 'Send a location message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendLocationMessageDto,
    description: 'The location message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "name": "<string>",
          "address": "<string>",
          "latitude": 123,
          "longitude": 123,
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendLocationMessageResponse,
    description: 'The location message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The location message was not found for instance name' })
  sendLocationMessage(@Param('instanceName') instanceName: string, @Body() createSendLocationMessageDto: CreateSendLocationMessageDto) {
    return this.sendMessageService.sendLocationMessage(instanceName, createSendLocationMessageDto);
  }

  @Post('/sendContact/:instanceName')
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendContactMessageDto,
    description: 'The contact message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "contact": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendContactMessageResponse,
    description: 'The contact message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The contact message was not found for instance name' })
  sendContactMessage(@Param('instanceName') instanceName: string, @Body() createSendContactMessageDto: CreateSendContactMessageDto) {
    return this.sendMessageService.sendContactMessage(instanceName, createSendContactMessageDto);
  }

  @Post('/sendReaction/:instanceName')
  @ApiOperation({ summary: 'Send a reaction message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendReactionMessageDto,
    description: 'The reaction message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "reaction": "<string>",
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendReactionMessageResponse,
    description: 'The reaction message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The reaction message was not found for instance name' })
  sendReactionMessage(@Param('instanceName') instanceName: string, @Body() createSendReactionMessageDto: CreateSendReactionMessageDto) {
    return this.sendMessageService.sendReactionMessage(instanceName, createSendReactionMessageDto);
  }

  @Post('/sendPoll/:instanceName')
  @ApiOperation({ summary: 'Send a poll message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendPollMessageDto,
    description: 'The poll message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "name": "<string>",
          "selectableCount": 123,
          "values": ["Array of poll options/values"],
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200,
    type: SendPollMessageResponse,
    description: 'The poll message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The poll message was not found for instance name' })
  sendPollMessage(@Param('instanceName') instanceName: string, @Body() createSendPollMessageDto: CreateSendPollMessageDto) {
    return this.sendMessageService.sendPollMessage(instanceName, createSendPollMessageDto);
  }

  @Post('/sendList/:instanceName')
  @ApiOperation({ summary: 'Send a list message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendListMessageDto,
    description: 'The list message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "title": "<string>",
          "description": "<string>",
          "buttonText": "<string>",
          "footerText": "<string>",
          "values": ["Array of list sections/rows"],
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendListMessageResponse,
    description: 'The list message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The list message was not found for instance name' })
  sendListMessage(@Param('instanceName') instanceName: string, @Body() createSendListMessageDto: CreateSendListMessageDto) {
    return this.sendMessageService.sendListMessage(instanceName, createSendListMessageDto);
  }

  @Post('/sendButtons/:instanceName')
  @ApiOperation({ summary: 'Send a buttons message' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateSendButtonsMessageDto,
    description: 'The buttons message to send',
    examples: {
      'full-config': {
        summary: 'Full message configuration',
        description: 'Complete message setup with all options',
        value: {
          "number": "<string>",
          "title": "<string>",
          "description": "<string>",
          "footer": "<string>",
          "buttons": ["Array of buttons"],
          "delay": 123,
          "linkPreview": true,
          "mentionsEveryOne": true,
          "mentioned": [
            "Array of remoteJIDs"
          ]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    type: SendButtonsMessageResponse,
    description: 'The buttons message was sent successfully' })
  @ApiResponse({ 
    status: 404, 
    description: 'The buttons message was not found for instance name' })
  sendButtonsMessage(@Param('instanceName') instanceName: string, @Body() createSendButtonsMessageDto: CreateSendButtonsMessageDto) {
    return this.sendMessageService.sendButtonsMessage(instanceName, createSendButtonsMessageDto);
  }
}
