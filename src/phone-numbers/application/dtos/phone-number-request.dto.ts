import {
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PhoneNumberType, PhoneNumberCapabilities, PhoneNumberCost } from '../../domain/entities/phone-number.entity';
import { CreateByoPhoneNumberDto } from './byo-phone-number.dto';
import { CreateTwilioPhoneNumberDto } from './twilio-phone-number.dto';
import { CreateVapiPhoneNumberDto } from './vapi-phone-number.dto';
import { CreateVonagePhoneNumberDto } from './vonage-phone-number.dto';
import { CreateTelnyxPhoneNumberDto } from './telnyx-phone-number.dto';

// Union type for all phone number providers
export type PhoneNumberProviderDto = 
  | CreateByoPhoneNumberDto 
  | CreateTwilioPhoneNumberDto 
  | CreateVapiPhoneNumberDto 
  | CreateVonagePhoneNumberDto 
  | CreateTelnyxPhoneNumberDto;

// Main DTO that accepts any provider type - using BYO as base since it's the most flexible
export class CreatePhoneNumberRequestDto {
  @ApiProperty({
    description: 'Credential ID for the phone number provider',
    example: 'credential_123456789'
  })
  @IsString()
  credentialId: string;

  @ApiProperty({
    description: 'Provider type for the phone number',
    enum: ['byo-phone-number', 'twilio-phone-number', 'vapi-phone-number', 'vonage-phone-number', 'telnyx-phone-number'],
    example: 'byo-phone-number'
  })
  @IsString()
  provider: 'byo-phone-number' | 'twilio-phone-number' | 'vapi-phone-number' | 'vonage-phone-number' | 'telnyx-phone-number';

  @ApiProperty({
    description: 'Phone number in E.164 format',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({
    description: 'Name for the phone number',
    example: 'My Business Line',
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the phone number',
    example: 'Main business phone line',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Assistant ID to associate with this phone number',
    example: 'assistant_123',
    required: false
  })
  @IsOptional()
  @IsString()
  assistantId?: string;

  @ApiProperty({
    description: 'Workflow ID to associate with this phone number',
    example: 'workflow_123',
    required: false
  })
  @IsOptional()
  @IsString()
  workflowId?: string;

  @ApiProperty({
    description: 'Squad ID to associate with this phone number',
    example: 'squad_123',
    required: false
  })
  @IsOptional()
  @IsString()
  squadId?: string;

  @ApiProperty({
    description: 'Enable E164 number validation',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  numberE164CheckEnabled?: boolean;

  @ApiProperty({
    description: 'Server configuration',
    required: false
  })
  @IsOptional()
  @IsObject()
  server?: {
    url: string;
    credentialId: string;
    timeoutSeconds?: number;
    headers?: Record<string, any>;
    backoffPlan?: {
      type: 'fixed' | 'exponential';
      maxRetries?: number;
      baseDelaySeconds?: number;
      excludedStatusCodes?: number[];
    };
  };

  @ApiProperty({
    description: 'Fallback destination configuration',
    required: false
  })
  @IsOptional()
  @IsObject()
  fallbackDestination?: {
    type: 'number' | 'assistant' | 'voicemail';
    number?: string;
    assistantId?: string;
    message?: string;
    callerId?: string;
    extension?: string;
    numberE164CheckEnabled?: boolean;
    transferPlan?: {
      mode: 'blind-transfer' | 'warm-transfer';
      message?: string;
      timeout?: number;
      sipVerb?: 'refer' | 'invite';
      holdAudioUrl?: string;
      transferCompleteAudioUrl?: string;
      twiml?: string;
      summaryPlan?: {
        messages: any[];
        enabled: boolean;
        timeoutSeconds?: number;
      };
      sipHeadersInReferToEnabled?: boolean;
      fallbackPlan?: {
        message?: any;
        endCallEnabled?: boolean;
      };
    };
    description?: string;
  };

  @ApiProperty({
    description: 'Hooks configuration',
    required: false
  })
  @IsOptional()
  hooks?: Array<{
    on: string;
    do: Array<{
      type: string;
      destination?: any;
      description?: string;
    }>;
  }>;
}
