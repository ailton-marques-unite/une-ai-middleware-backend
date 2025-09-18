import { PartialType } from '@nestjs/mapped-types';
import { CreateCallDto } from './create-call.dto';
import { IsOptional, IsEnum, IsString, IsDateString, IsNumber } from 'class-validator';
import { CallStatus, EndReason } from '../../domain/entities/call.entity';

export class UpdateCallDto extends PartialType(CreateCallDto) {
  @IsOptional()
  @IsEnum(CallStatus)
  status?: CallStatus;

  @IsOptional()
  @IsEnum(EndReason)
  endReason?: EndReason;

  @IsOptional()
  @IsString()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsString()
  costCurrency?: string;

  @IsOptional()
  @IsString()
  transcript?: string;
}