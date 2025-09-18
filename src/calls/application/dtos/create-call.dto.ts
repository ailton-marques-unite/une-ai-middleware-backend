import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CallType, CallMessage } from '../../domain/entities/call.entity';

export class CreateCallDto {
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
  @IsEnum(CallType)
  type?: CallType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CallMessage)
  messages?: CallMessage[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

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

  @IsOptional()
  @IsBoolean()
  recordCall?: boolean;

  @IsOptional()
  @IsString()
  customData?: string;
}
