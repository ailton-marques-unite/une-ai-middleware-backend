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

export enum AnalyticsType {
  CALL_ANALYTICS = 'call-analytics',
  ASSISTANT_ANALYTICS = 'assistant-analytics',
  CAMPAIGN_ANALYTICS = 'campaign-analytics',
  PERFORMANCE_ANALYTICS = 'performance-analytics',
  USAGE_ANALYTICS = 'usage-analytics',
  ERROR_ANALYTICS = 'error-analytics',
  COST_ANALYTICS = 'cost-analytics',
  CUSTOM = 'custom',
}

export enum AnalyticsStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export enum MetricsType {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram',
  SUMMARY = 'summary',
  CUSTOM = 'custom',
}

export enum TimeRange {
  HOUR = '1h',
  DAY = '1d',
  WEEK = '1w',
  MONTH = '1M',
  QUARTER = '1Q',
  YEAR = '1Y',
  CUSTOM = 'custom',
}

export class AnalyticsMetric {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(MetricsType)
  type: MetricsType;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsObject()
  labels?: Record<string, string>;

  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class AnalyticsDimension {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class AnalyticsFilter {
  @IsString()
  field: string;

  @IsString()
  operator: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class AnalyticsAggregation {
  @IsString()
  field: string;

  @IsString()
  function: string;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsOptional()
  @IsObject()
  parameters?: Record<string, any>;
}

export class AnalyticsQuery {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyticsFilter)
  filters?: AnalyticsFilter[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnalyticsAggregation)
  aggregations?: AnalyticsAggregation[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  groupBy?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  orderBy?: string[];

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsEnum(TimeRange)
  timeRange?: TimeRange;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}

export class AnalyticsReport {
  @IsString()
  id: string;

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

export class Analytics {
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
