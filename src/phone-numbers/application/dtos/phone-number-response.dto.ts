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
import {
  PhoneNumberType,
  PhoneNumberStatus,
  PhoneNumberCapabilities,
  PhoneNumberCost,
} from '../../domain/entities/phone-number.entity';

export class PhoneNumberResponseDto {
  @IsString()
  id: string;

  @IsString()
  orgId: string;

  @IsString()
  number: string;

  @IsString()
  countryCode: string;

  @IsString()
  areaCode: string;

  @IsEnum(PhoneNumberType)
  type: PhoneNumberType;

  @IsEnum(PhoneNumberStatus)
  status: PhoneNumberStatus;

  @IsString()
  provider: string;

  @IsString()
  providerId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneNumberCapabilities)
  capabilities?: PhoneNumberCapabilities;

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneNumberCost)
  cost?: PhoneNumberCost;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  friendlyName?: string;

  @IsOptional()
  @IsString()
  voiceUrl?: string;

  @IsOptional()
  @IsString()
  smsUrl?: string;

  @IsOptional()
  @IsString()
  statusCallback?: string;

  @IsOptional()
  @IsString()
  statusCallbackMethod?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsOptional()
  @IsString()
  purchasedAt?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  locality?: string;

  @IsOptional()
  @IsString()
  addressRequirements?: string;

  @IsOptional()
  @IsBoolean()
  beta?: boolean;

  @IsOptional()
  @IsString()
  emergencyAddressSid?: string;

  @IsOptional()
  @IsString()
  emergencyStatus?: string;

  @IsOptional()
  @IsString()
  identitySid?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  phoneNumberSid?: string;

  @IsOptional()
  @IsString()
  trunkSid?: string;

  @IsOptional()
  @IsString()
  uri?: string;

  @IsOptional()
  @IsString()
  voiceApplicationSid?: string;

  @IsOptional()
  @IsString()
  voiceCallerIdLookup?: string;

  @IsOptional()
  @IsString()
  voiceFallbackMethod?: string;

  @IsOptional()
  @IsString()
  voiceFallbackUrl?: string;

  @IsOptional()
  @IsString()
  voiceMethod?: string;

  @IsOptional()
  @IsString()
  voiceReceiveMode?: string;

  @IsOptional()
  @IsString()
  smsApplicationSid?: string;

  @IsOptional()
  @IsString()
  smsFallbackMethod?: string;

  @IsOptional()
  @IsString()
  smsFallbackUrl?: string;

  @IsOptional()
  @IsString()
  smsMethod?: string;

  @IsOptional()
  @IsString()
  statusCallbackEvent?: string;

  @IsOptional()
  @IsString()
  statusCallbackUrl?: string;
}
