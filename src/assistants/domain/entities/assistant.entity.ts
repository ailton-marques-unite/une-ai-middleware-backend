import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum FirstMessageMode {
  ASSISTANT_SPEAKS_FIRST = 'assistant-speaks-first',
  ASSISTANT_SPEAKS_FIRST_WITH_MODEL_GENERATED_MESSAGE = 'assistant-speaks-first-with-model-generated-message',
  ASSISTANT_WAITS_FOR_USER = 'assistant-waits-for-user',
}

export enum ClientMessage {
  CONVERSATION_UPDATE = 'conversation-update',
  FUNCTION_CALL = 'function-call',
  HANG = 'hang',
  MODEL_OUTPUT = 'model-output',
  SPEECH_UPDATE = 'speech-update',
  STATUS_UPDATE = 'status-update',
  TRANSFER_UPDATE = 'transfer-update',
  TRANSCRIPT = 'transcript',
  TOOL_CALLS = 'tool-calls',
  USER_INTERRUPTED = 'user-interrupted',
  VOICE_INPUT = 'voice-input',
  WORKFLOW_NODE_STARTED = 'workflow.node.started',
}

export enum ServerMessage {
  CONVERSATION_UPDATE = 'conversation-update',
  END_OF_CALL_REPORT = 'end-of-call-report',
  FUNCTION_CALL = 'function-call',
  HANG = 'hang',
  SPEECH_UPDATE = 'speech-update',
  STATUS_UPDATE = 'status-update',
  TOOL_CALLS = 'tool-calls',
  TRANSFER_DESTINATION_REQUEST = 'transfer-destination-request',
  HANDOFF_DESTINATION_REQUEST = 'handoff-destination-request',
  USER_INTERRUPTED = 'user-interrupted',
}

export class TranscriberConfig {
  @IsString()
  provider: string;

  @IsString()
  language: string;

  @IsNumber()
  confidenceThreshold: number;

  @IsBoolean()
  formatTurns: boolean;

  @IsNumber()
  endOfTurnConfidenceThreshold: number;

  @IsNumber()
  minEndOfTurnSilenceWhenConfident: number;

  @IsNumber()
  wordFinalizationMaxWaitTime: number;

  @IsNumber()
  maxTurnSilence: number;

  @IsOptional()
  @IsString()
  realtimeUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  wordBoost?: string[];

  @IsOptional()
  @IsNumber()
  endUtteranceSilenceThreshold?: number;

  @IsOptional()
  @IsBoolean()
  disablePartialTranscripts?: boolean;
}

export class ModelConfig {
  @IsArray()
  messages: Array<{ content: string; role: string }>;

  @IsOptional()
  @IsArray()
  tools?: any[];
}

export class VoiceConfig {
  @IsString()
  provider: string;

  @IsString()
  voiceId: string;

  @IsOptional()
  @IsNumber()
  speed?: number;

  @IsOptional()
  @IsNumber()
  pitch?: number;

  @IsOptional()
  @IsNumber()
  volume?: number;
}

export class VoicemailDetectionConfig {
  @IsBoolean()
  enabled: boolean;

  @IsNumber()
  timeoutSeconds: number;

  @IsString()
  greetingMessage: string;

  @IsArray()
  @IsString({ each: true })
  voicemailDetectionPhrases: string[];
}

export class Assistant {
  @IsString()
  id: string;

  @IsString()
  orgId: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

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
