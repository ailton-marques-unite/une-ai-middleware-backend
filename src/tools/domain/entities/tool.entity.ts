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

export enum ToolType {
  FUNCTION = 'function',
  WEBHOOK = 'webhook',
  API = 'api',
  DATABASE = 'database',
  EMAIL = 'email',
  SMS = 'sms',
  CALENDAR = 'calendar',
  CRM = 'crm',
  PAYMENT = 'payment',
  CUSTOM = 'custom',
}

export enum ToolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ERROR = 'error',
  DEPRECATED = 'deprecated',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class ToolParameter {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsObject()
  schema?: Record<string, any>;

  @IsOptional()
  @IsString()
  defaultValue?: string;
}

export class ToolAuthentication {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsString()
  bearerToken?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  @IsString()
  oauthUrl?: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  clientSecret?: string;
}

export class ToolEndpoint {
  @IsString()
  url: string;

  @IsEnum(HttpMethod)
  method: HttpMethod;

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  @IsNumber()
  timeout?: number;

  @IsOptional()
  @IsNumber()
  retryCount?: number;

  @IsOptional()
  @IsNumber()
  retryDelay?: number;
}

export class ToolWebhook {
  @IsString()
  url: string;

  @IsOptional()
  @IsEnum(HttpMethod)
  method?: HttpMethod;

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  @IsString()
  secret?: string;

  @IsOptional()
  @IsBoolean()
  verifySignature?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  events?: string[];
}

export class ToolFunction {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToolParameter)
  parameters: ToolParameter[];

  @IsOptional()
  @IsString()
  implementation?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsObject()
  runtime?: Record<string, any>;
}

export class Tool {
  @IsString()
  id: string;

  @IsString()
  orgId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ToolType)
  type: ToolType;

  @IsEnum(ToolStatus)
  status: ToolStatus;

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
  usageCount?: number;

  @IsOptional()
  @IsNumber()
  successRate?: number;

  @IsOptional()
  @IsNumber()
  averageResponseTime?: number;

  @IsOptional()
  @IsString()
  lastUsedAt?: string;

  @IsOptional()
  @IsString()
  lastErrorAt?: string;

  @IsOptional()
  @IsString()
  lastErrorMessage?: string;

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

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
