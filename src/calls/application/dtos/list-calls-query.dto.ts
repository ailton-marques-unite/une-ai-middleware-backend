import {
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
  Max,
  IsEnum,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CallStatus, CallType } from '../../domain/entities/call.entity';

export class ListCallsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  limit?: number = 100;

  @IsOptional()
  @IsDateString()
  createdAtGt?: string;

  @IsOptional()
  @IsDateString()
  createdAtLt?: string;

  @IsOptional()
  @IsDateString()
  createdAtGe?: string;

  @IsOptional()
  @IsDateString()
  createdAtLe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLe?: string;

  @IsOptional()
  @IsEnum(CallStatus)
  status?: CallStatus;

  @IsOptional()
  @IsEnum(CallType)
  type?: CallType;

  @IsOptional()
  @IsString()
  assistantId?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  customerPhoneNumber?: string;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}
