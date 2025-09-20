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
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsQuery,
  AnalyticsMetric,
  AnalyticsDimension,
} from '../../domain/entities/analytics.entity';

export class AnalyticsResponseDto {
  @IsString()
  id: string;

  @IsString()
  orgId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(AnalyticsType)
  type: AnalyticsType;

  @IsEnum(AnalyticsStatus)
  status: AnalyticsStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => AnalyticsQuery)
  query?: AnalyticsQuery;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyticsMetric)
  metrics?: AnalyticsMetric[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyticsDimension)
  dimensions?: AnalyticsDimension[];

  @IsOptional()
  @IsObject()
  configuration?: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  @IsBoolean()
  isScheduled?: boolean;

  @IsOptional()
  @IsString()
  lastRunAt?: string;

  @IsOptional()
  @IsString()
  nextRunAt?: string;

  @IsOptional()
  @IsNumber()
  runCount?: number;

  @IsOptional()
  @IsNumber()
  successCount?: number;

  @IsOptional()
  @IsNumber()
  errorCount?: number;

  @IsOptional()
  @IsString()
  lastError?: string;

  @IsOptional()
  @IsNumber()
  processingTime?: number;

  @IsOptional()
  @IsNumber()
  recordCount?: number;

  @IsOptional()
  @IsString()
  fileSize?: string;

  @IsOptional()
  @IsString()
  filePath?: string;

  @IsOptional()
  @IsString()
  downloadUrl?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsString()
  webhookUrl?: string;

  @IsOptional()
  @IsBoolean()
  webhookNotification?: boolean;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
