import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatwootService } from '../../application/services/chatwoot.service';
import { CreateChatwootDto } from '../../application/dtos/create-chatwoot.dto';
import { UpdateChatwootDto } from '../../application/dtos/update-chatwoot.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SetChatwookDtoResponse } from '../../application/dtos/responses/set-chatwook-dto.response';

@ApiTags('Chatwoot')
@Controller('chatwoot')
export class ChatwootController {
  constructor(private readonly chatwootService: ChatwootService) {}

  @Get('/find/:instanceName')
  @ApiOperation({ summary: 'Find chatwoot by instance name' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiResponse({ 
    status: 200,
    description: 'The chatwoot has been successfully found.'
  })
  @ApiResponse({ 
    status: 400,
    description: 'Chatwoot is disabled.'
  })
  @ApiResponse({ 
    status: 500,
    description: 'Chatwoot is disabled.'
  })
  findByName(@Param('instanceName') instanceName: string) {
    return this.chatwootService.findByName(instanceName);
  }

  @Post('/set/:instanceName')
  @ApiOperation({ summary: 'Set chatwoot by instance name' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: CreateChatwootDto,
    description: 'The chatwoot to set',
    examples: {
      'full-config': {
        summary: 'Full chatwoot configuration',
        description: 'Complete chatwoot setup with all options',
        value: {
          "enabled": true,
          "accountId": "1234567890",
          "token": "1234567890",
          "url": "https://example.com",
          "signMsg": true,
          "reopenConversation": true,
          "conversationPending": true,
          "nameInbox": "My Inbox",
          "mergeBrazilContacts": true,
          "importContacts": true,
          "importMessages": true,
          "daysLimitImportMessages": 10,
          "signDelimiter": "|",
          "autoCreate": true,
          "organization": "My Organization",
          "logo": "https://example.com/logo.png",
          "ignoreJids": ["1234567890@s.whatsapp.net"]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200,
    description: 'The chatwoot has been successfully set.',
    type: SetChatwookDtoResponse
  })
  setChatwoot(@Param('instanceName') instanceName: string, @Body() updateChatwootDto: UpdateChatwootDto) {
    return this.chatwootService.setChatwoot(instanceName, updateChatwootDto);
  }

}
