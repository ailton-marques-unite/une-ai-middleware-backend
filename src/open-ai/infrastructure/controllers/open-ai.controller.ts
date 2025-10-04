import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put } from '@nestjs/common';
import { OpenAiService } from '../../application/services/open-ai.service';
import { CreateOpenAiDto } from '../../application/dtos/create-open-ai.dto';
import { UpdateOpenAiDto } from '../../application/dtos/update-open-ai.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigOpenAiCredentialsDto } from '../../application/dtos/config-open-ai-credentials.dto';
import { UpdateOpenAiCredentialsDto } from '../../application/dtos/update-open-ai-credentials.dto';
import { UpdateOpenAiSettingsDto } from '../../application/dtos/update-open-ai-settings.dto';

@ApiTags('Open AI')
@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('/create/:instanceName')
  @ApiOperation({ summary: 'Create a new Open AI bot' })
  @ApiResponse({ 
    status: 201, 
    description: 'The bot has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBody({ 
    type: CreateOpenAiDto,
    description: 'The Open AI bot to create',
    examples: { 
      'full-config': {
        summary: 'Full bot configuration',
        description: 'Complete bot setup with all options',
        value: {
          "enabled": true,
          "openaiCredsId": "1234567890",
          "botType": "openai",
          "assistantId": "1234567890",
          "functionUrl": "https://example.com/function",
          "model": "gpt-4o-mini",
          "systemMessages": ["You are a helpful assistant."],
          "assistantMessages": ["You are a helpful assistant."],
          "userMessages": ["You are a helpful assistant."],
          "maxTokens": 1000,
          "triggerType": "message",
          "triggerOperator": "contains",
          "triggerValue": "hello",
          "expire": 3600,
          "keywordFinish": "bye",
          "delayMessage": 1000,
          "unknownMessage": "I don't understand.",
          "listeningFromMe": true,
          "stopBotFromMe": false,
          "keepOpen": false,
          "debounceTime": 1000,
          "ignoreJids": ["1234567890@s.whatsapp.net"]
        }
      }
    }
  })
  createBot(
    @Param('instanceName') instanceName: string,
    @Body() createOpenAiDto: CreateOpenAiDto) {
    return this.openAiService.createBot(instanceName, createOpenAiDto);
  }

  @Get('/find/:instanceName')
  @ApiOperation({ summary: 'Find all Open AI bots' })
  @ApiResponse({ 
    status: 200, 
    description: 'The bots have been successfully found.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findAllBots(@Param('instanceName') instanceName: string) {
    return this.openAiService.findAllBots(instanceName);
  }

  @Get('/find/:openaiBotId/:instanceName')
  @ApiOperation({ summary: 'Find a Open AI bot' })
  @ApiResponse({ 
    status: 200, 
    description: 'The bot has been successfully found.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  findBot(
    @Param('openaiBotId') openaiBotId: string, 
    @Param('instanceName') instanceName: string) {
    return this.openAiService.findBot(instanceName, openaiBotId);
  }

  @Put('/update/:openaiBotId/:instanceName')
  @ApiOperation({ summary: 'Update a Open AI bot' })
  @ApiResponse({ 
    status: 200, 
    description: 'The bot has been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBody({ 
    type: UpdateOpenAiDto,
    description: 'The Open AI bot to update',
    examples: { 
      'full-config': {
        summary: 'Full bot configuration',
        description: 'Complete bot setup with all options',
        value: {
          "enabled": true,
          "openaiCredsId": "1234567890",
          "botType": "openai",
          "assistantId": "1234567890",
          "functionUrl": "https://example.com/function",
          "model": "gpt-4o-mini",
          "systemMessages": ["You are a helpful assistant."],
          "assistantMessages": ["You are a helpful assistant."],
          "userMessages": ["You are a helpful assistant."],
          "maxTokens": 1000,
          "triggerType": "message",
          "triggerOperator": "contains",
          "triggerValue": "hello",
          "expire": 3600,
          "keywordFinish": "bye",
          "delayMessage": 1000,
          "unknownMessage": "I don't understand.",
          "listeningFromMe": true,
          "stopBotFromMe": false,
          "keepOpen": false,
          "debounceTime": 1000,
          "ignoreJids": ["1234567890@s.whatsapp.net"]
        }
      }
    }
  })
  updateBot(
    @Param('instanceName') instanceName: string, 
    @Param('openaiBotId') openaiBotId: string,
    @Body() updateOpenAiDto: UpdateOpenAiDto) {
    return this.openAiService.updateBot(instanceName, openaiBotId, updateOpenAiDto);
  }

  @Delete('/delete/:openaiBotId/:instanceName')
  @ApiOperation({ summary: 'Delete a Open AI bot' })
  @ApiResponse({ 
    status: 200, 
    description: 'The bot has been successfully deleted.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'openaiBotId', description: 'The ID of the Open AI bot' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  deleteBot(
    @Param('openaiBotId') openaiBotId: string,
    @Param('instanceName') instanceName: string) {
    return this.openAiService.deleteBot(instanceName, openaiBotId);
  }

  @Get('/creds/:instanceName')
  @ApiOperation({ summary: 'Find all Open AI credentials' })
  @ApiResponse({ 
    status: 200, 
    description: 'The credentials have been successfully found.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  findOpenAiCredentials(@Param('instanceName') instanceName: string) {
    return this.openAiService.findOpenAiCredentials(instanceName);
  }

  @Post('/creds/:instanceName')
  @ApiOperation({ summary: 'Config a Open AI credentials' })
  @ApiResponse({ 
    status: 200, 
    description: 'The credentials have been successfully configured.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: ConfigOpenAiCredentialsDto,
    description: 'The Open AI credentials to configure',
    examples: { 
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "apiKey": "1234567890",
          "name": "Open AI"
        }
      }
    }
  })
  configOpenAiCredentials(
    @Param('instanceName') instanceName: string,
    @Body() configOpenAiCredentialsDto: ConfigOpenAiCredentialsDto) {
    return this.openAiService.configOpenAiCredentials(instanceName, configOpenAiCredentialsDto);
  }

  @Delete('/creds/:openaiCredsId/:instanceName')
  @ApiOperation({ summary: 'Delete a Open AI credentials' })
  @ApiResponse({ 
    status: 200, 
    description: 'The credentials have been successfully deleted.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'openaiCredsId', description: 'The ID of the Open AI credentials' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  deleteOpenAiCredentials(
    @Param('openaiCredsId') openaiCredsId: string,
    @Param('instanceName') instanceName: string) {
    return this.openAiService.deleteOpenAiCredentials(instanceName, openaiCredsId);
  }

  @Post('/settings/:instanceName')
  @ApiOperation({ summary: 'Update a Open AI credentials' })
  @ApiResponse({ 
    status: 200, 
    description: 'The credentials have been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: UpdateOpenAiCredentialsDto,
    description: 'The Open AI credentials to update',
    examples: { 
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "openaiCredsId": "cred_1234567890abcdef",
          "expire": 3600,
          "keywordFinish": "stop",
          "delayMessage": 2000,
          "unknownMessage": "I don't understand. Can you please rephrase?",
          "listeningFromMe": true,
          "stopBotFromMe": false,
          "keepOpen": true,
          "debounceTime": 500,
          "ignoreJids": [
            "120363123456789012@g.us",
            "5511999999999@s.whatsapp.net"
          ],
          "openaiIdFallback": "fallback_cred_0987654321fedcba"
        }
      }
    }
  })
  updateOpenAiCredentials(
    @Param('instanceName') instanceName: string,
    @Body() updateOpenAiCredentialsDto: UpdateOpenAiCredentialsDto) {
    return this.openAiService.updateOpenAiCredentials(instanceName, updateOpenAiCredentialsDto);
  }

  @Get('/fetchSettings/:instanceName')
  @ApiOperation({ summary: 'Find a Open AI settings' })
  @ApiResponse({ 
    status: 200, 
    description: 'The settings have been successfully found.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  findOpenAiSettings(@Param('instanceName') instanceName: string) {
    return this.openAiService.findOpenAiSettings(instanceName);
  }

  @Post('/changeStatus/:instanceName')
  @ApiOperation({ summary: 'Settings a Open AI credentials' })
  @ApiResponse({ 
    status: 200, 
    description: 'The settings have been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  @ApiBody({ 
    type: UpdateOpenAiSettingsDto,
    description: 'The Open AI settings to update',
    examples: { 
      'default-config': {
        summary: 'Default configuration',
        description: 'Complete configuration with all options',
        value: {
          "remoteJid": "120363123456789012@g.us",
          "status": "opened"
        }
      }
    }
  })
  updateOpenAiSettings(@Param('instanceName') instanceName: string, @Body() updateOpenAiSettingsDto: UpdateOpenAiSettingsDto) {
    return this.openAiService.updateOpenAiSettings(instanceName, updateOpenAiSettingsDto);
  }

  @Get('/fetchSessions/:openaiBotId/:instanceName')
  @ApiOperation({ summary: 'Find a Open AI sessions' })
  @ApiResponse({ 
    status: 200, 
    description: 'The sessions have been successfully found.'
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiParam({ name: 'openaiBotId', description: 'The ID of the Open AI bot' })
  @ApiParam({ name: 'instanceName', description: 'The name of the instance' })
  findOpenAiSessions(
    @Param('openaiBotId') openaiBotId: string,
    @Param('instanceName') instanceName: string) {
    return this.openAiService.findOpenAiSessions(instanceName, openaiBotId);
  }
}
