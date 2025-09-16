import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FirstMessageMode, ClientMessage, ServerMessage, TranscriberConfig, ModelConfig, VoiceConfig, VoicemailDetectionConfig } from '../../domain/entities/assistant.entity';

export class CreateAssistantDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => TranscriberConfig)
  transcriber?: TranscriberConfig;

  @IsOptional()
  @ValidateNested()
  @Type(() => ModelConfig)
  model?: ModelConfig;

  @IsOptional()
  @ValidateNested()
  @Type(() => VoiceConfig)
  voice?: VoiceConfig;

  @IsOptional()
  @IsString()
  firstMessage?: string;

  @IsOptional()
  @IsBoolean()
  firstMessageInterruptionsEnabled?: boolean;

  @IsOptional()
  @IsEnum(FirstMessageMode)
  firstMessageMode?: FirstMessageMode;

  @IsOptional()
  @ValidateNested()
  @Type(() => VoicemailDetectionConfig)
  voicemailDetection?: VoicemailDetectionConfig;

  @IsOptional()
  @IsArray()
  @IsEnum(ClientMessage, { each: true })
  clientMessages?: ClientMessage[];

  @IsOptional()
  @IsArray()
  @IsEnum(ServerMessage, { each: true })
  serverMessages?: ServerMessage[];

  @IsOptional()
  @IsNumber()
  maxDurationSeconds?: number;

  @IsOptional()
  backgroundSound?: string;

  @IsOptional()
  @IsBoolean()
  modelOutputInMessagesEnabled?: boolean;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  voicemailMessage?: string;

  @IsOptional()
  @IsString()
  endCallMessage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  endCallPhrases?: string[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
