import { Injectable } from '@nestjs/common';
import { CreateOpenAiDto } from '../dtos/create-open-ai.dto';
import { UpdateOpenAiDto } from '../dtos/update-open-ai.dto';
import { OpenAiRepository } from '../../infrastructure/repositories/open-ai.repository';
import { ConfigOpenAiCredentialsDto } from '../dtos/config-open-ai-credentials.dto';
import { UpdateOpenAiCredentialsDto } from '../dtos/update-open-ai-credentials.dto';
import { UpdateOpenAiSettingsDto } from '../dtos/update-open-ai-settings.dto';

@Injectable()
export class OpenAiService {

  constructor(private readonly openAiRepository: OpenAiRepository) {}

  createBot(instanceName: string, createOpenAiDto: CreateOpenAiDto) {
    return this.openAiRepository.createBot(instanceName, createOpenAiDto);
  }

  findBot(instanceName: string, openaiBotId: string) {
    return this.openAiRepository.findBot(instanceName, openaiBotId);
  }

  findAllBots(instanceName: string) {
    return this.openAiRepository.findAllBots(instanceName);
  }

  updateBot(instanceName: string, openaiBotId: string, updateOpenAiDto: UpdateOpenAiDto) {
    return this.openAiRepository.updateBot(instanceName, openaiBotId, updateOpenAiDto);
  }

  deleteBot(instanceName: string, openaiBotId: string) {
    return this.openAiRepository.deleteBot(instanceName, openaiBotId);
  }

  findOpenAiCredentials(instanceName: string) {
    return this.openAiRepository.findOpenAiCredentials(instanceName);
  }

  configOpenAiCredentials(instanceName: string, configOpenAiCredentialsDto: ConfigOpenAiCredentialsDto) {
    return this.openAiRepository.configOpenAiCredentials(instanceName, configOpenAiCredentialsDto);
  }

  deleteOpenAiCredentials(instanceName: string, openaiCredsId: string) {
    return this.openAiRepository.deleteOpenAiCredentials(instanceName, openaiCredsId);
  }

  updateOpenAiCredentials(instanceName: string, updateOpenAiCredentialsDto: UpdateOpenAiCredentialsDto) {
    return this.openAiRepository.updateOpenAiCredentials(instanceName, updateOpenAiCredentialsDto);
  }

  findOpenAiSettings(instanceName: string) {
    return this.openAiRepository.findOpenAiSettings(instanceName);
  }

  updateOpenAiSettings(instanceName: string, updateOpenAiSettingsDto: UpdateOpenAiSettingsDto) {
    return this.openAiRepository.updateOpenAiSettings(instanceName, updateOpenAiSettingsDto);
  }

  findOpenAiSessions(instanceName: string, openaiBotId: string) {
    return this.openAiRepository.findOpenAiSessions(instanceName, openaiBotId);
  }
}
