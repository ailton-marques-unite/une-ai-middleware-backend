import {
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  FirstMessageMode,
  ClientMessage,
  ServerMessage,
  TranscriberConfig,
  ModelConfig,
  VoiceConfig,
  VoicemailDetectionConfig,
} from '../../domain/entities/assistant.entity';

export class CreateAssistantDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => ModelConfig)
  model: ModelConfig;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
