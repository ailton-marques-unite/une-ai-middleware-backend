import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum CampaignType {
  OUTBOUND = 'outbound',
  INBOUND = 'inbound',
  SURVEY = 'survey',
  FOLLOW_UP = 'follow-up',
  PROMOTIONAL = 'promotional',
}

export class CampaignTarget {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CampaignSchedule {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  daysOfWeek?: string[];

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsNumber()
  maxCallsPerDay?: number;

  @IsOptional()
  @IsNumber()
  maxCallsPerHour?: number;
}

export class CampaignSettings {
  @IsOptional()
  @IsNumber()
  maxRetries?: number;

  @IsOptional()
  @IsNumber()
  retryDelay?: number;

  @IsOptional()
  @IsNumber()
  maxCallDuration?: number;

  @IsOptional()
  @IsBoolean()
  recordCalls?: boolean;

  @IsOptional()
  @IsBoolean()
  allowVoicemail?: boolean;

  @IsOptional()
  @IsString()
  voicemailMessage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedTimeSlots?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  blockedTimeSlots?: string[];
}

export class CampaignMetrics {
  @IsOptional()
  @IsNumber()
  totalTargets?: number;

  @IsOptional()
  @IsNumber()
  callsAttempted?: number;

  @IsOptional()
  @IsNumber()
  callsConnected?: number;

  @IsOptional()
  @IsNumber()
  callsCompleted?: number;

  @IsOptional()
  @IsNumber()
  callsFailed?: number;

  @IsOptional()
  @IsNumber()
  callsAnswered?: number;

  @IsOptional()
  @IsNumber()
  callsNoAnswer?: number;

  @IsOptional()
  @IsNumber()
  callsBusy?: number;

  @IsOptional()
  @IsNumber()
  totalDuration?: number;

  @IsOptional()
  @IsNumber()
  averageCallDuration?: number;

  @IsOptional()
  @IsNumber()
  successRate?: number;

  @IsOptional()
  @IsNumber()
  answerRate?: number;
}

export class Campaign {
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

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @IsEnum(CampaignType)
  type: CampaignType;

  @IsString()
  assistantId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CampaignTarget)
  targets?: CampaignTarget[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CampaignSchedule)
  schedule?: CampaignSchedule;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampaignSettings)
  settings?: CampaignSettings;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampaignMetrics)
  metrics?: CampaignMetrics;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsString()
  campaignGroupId?: string;
}
