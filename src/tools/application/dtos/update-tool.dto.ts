import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolType, ToolStatus, HttpMethod, ToolParameter, ToolAuthentication, ToolEndpoint, ToolWebhook, ToolFunction } from '../../domain/entities/tool.entity';

export class UpdateToolDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ToolType)
  type?: ToolType;

  @IsOptional()
  @IsEnum(ToolStatus)
  status?: ToolStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToolFunction)
  function?: ToolFunction;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToolEndpoint)
  endpoint?: ToolEndpoint;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToolWebhook)
  webhook?: ToolWebhook;

  @IsOptional()
  @ValidateNested()
  @Type(() => ToolAuthentication)
  authentication?: ToolAuthentication;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  configuration?: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  documentation?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  rateLimit?: number;

  @IsOptional()
  @IsNumber()
  rateLimitWindow?: number;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  environment?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @IsOptional()
  @IsString()
  webhookSecret?: string;

  @IsOptional()
  @IsBoolean()
  validateWebhook?: boolean;

  @IsOptional()
  @IsString()
  webhookEndpoint?: string;

  @IsOptional()
  @IsString()
  webhookMethod?: string;

  @IsOptional()
  @IsObject()
  webhookHeaders?: Record<string, string>;
}
