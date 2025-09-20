import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PhoneNumberType,
  PhoneNumberStatus,
} from '../../domain/entities/phone-number.entity';

export class ListPhoneNumbersQueryDto {
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
  @IsEnum(PhoneNumberStatus)
  status?: PhoneNumberStatus;

  @IsOptional()
  @IsEnum(PhoneNumberType)
  type?: PhoneNumberType;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsString()
  areaCode?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  friendlyName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  locality?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  beta?: boolean;

  @IsOptional()
  @IsString()
  emergencyStatus?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  voiceReceiveMode?: string;

  @IsOptional()
  @IsString()
  addressRequirements?: string;
}
