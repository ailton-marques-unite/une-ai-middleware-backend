import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AnalyticsType, TimeRange, AnalyticsFilter, AnalyticsAggregation, AnalyticsQuery, AnalyticsMetric, AnalyticsDimension } from '../../domain/entities/analytics.entity';

export class CreateAnalyticsDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(AnalyticsType)
  type: AnalyticsType;

  @IsOptional()
  @ValidateNested()
  @Type(() => AnalyticsQuery)
  query?: AnalyticsQuery;

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
}
