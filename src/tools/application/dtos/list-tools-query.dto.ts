import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolType, ToolStatus } from '../../domain/entities/tool.entity';

export class ListToolsQueryDto {
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
  @IsEnum(ToolStatus)
  status?: ToolStatus;

  @IsOptional()
  @IsEnum(ToolType)
  type?: ToolType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  author?: string;

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
  environment?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  enabled?: boolean;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minUsageCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxUsageCount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minSuccessRate?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSuccessRate?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minAverageResponseTime?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxAverageResponseTime?: number;
}
