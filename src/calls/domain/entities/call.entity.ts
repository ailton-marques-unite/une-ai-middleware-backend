import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum CallStatus {
  QUEUED = 'queued',
  RINGING = 'ringing',
  IN_PROGRESS = 'in-progress',
  FORWARDING = 'forwarding',
  ENDED = 'ended',
  BUSY = 'busy',
  FAILED = 'failed',
  NO_ANSWER = 'no-answer',
  CANCELED = 'canceled',
}

export enum CallType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export enum EndReason {
  HANGUP = 'hangup',
  TRANSFER = 'transfer',
  VOICEMAIL = 'voicemail',
  FAILED = 'failed',
  BUSY = 'busy',
  NO_ANSWER = 'no-answer',
  CANCELED = 'canceled',
}

export class CallMessage {
  @IsString()
  role: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CallRecording {
  @IsString()
  id: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}

export class CallAnalysis {
  @IsOptional()
  @IsObject()
  sentiment?: Record<string, any>;

  @IsOptional()
  @IsObject()
  summary?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topics?: string[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class Call {
  @IsString()
  id: string;

  @IsString()
  orgId: string;

  @IsString()
  @IsDateString()
  createdAt: string;

  @IsString()
  @IsDateString()
  updatedAt: string;

  @IsEnum(CallStatus)
  status: CallStatus;

  @IsEnum(CallType)
  type: CallType;

  @IsString()
  assistantId: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  customerPhoneNumber?: string;

  @IsOptional()
  @IsString()
  assistantPhoneNumber?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsEnum(EndReason)
  endReason?: EndReason;

  @IsOptional()
  @IsString()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CallMessage)
  messages?: CallMessage[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CallRecording)
  recording?: CallRecording;

  @IsOptional()
  @ValidateNested()
  @Type(() => CallAnalysis)
  analysis?: CallAnalysis;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsString()
  costCurrency?: string;

  @IsOptional()
  @IsString()
  transcript?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}
