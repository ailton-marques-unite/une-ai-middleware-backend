import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { AnalyticsType, AnalyticsStatus } from '../../domain/entities/analytics.entity';

export class ListAnalyticsQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  limit?: number = 100;

  @IsOptional()
  @IsString()
  createdAtGt?: string;

  @IsOptional()
  @IsString()
  createdAtLt?: string;

  @IsOptional()
  @IsString()
  createdAtGe?: string;

  @IsOptional()
  @IsString()
  createdAtLe?: string;

  @IsOptional()
  @IsString()
  updatedAtGt?: string;

  @IsOptional()
  @IsString()
  updatedAtLt?: string;

  @IsOptional()
  @IsString()
  updatedAtGe?: string;

  @IsOptional()
  @IsString()
  updatedAtLe?: string;

  @IsOptional()
  @IsEnum(AnalyticsStatus)
  status?: AnalyticsStatus;

  @IsOptional()
  @IsEnum(AnalyticsType)
  type?: AnalyticsType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsString()
  schedule?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isScheduled?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  emailNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  webhookNotification?: boolean;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minRunCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxRunCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minSuccessCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSuccessCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minErrorCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxErrorCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minProcessingTime?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxProcessingTime?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minRecordCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxRecordCount?: number;
}
