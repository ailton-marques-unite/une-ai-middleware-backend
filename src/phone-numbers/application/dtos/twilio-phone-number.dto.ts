import { IsString, IsOptional, IsObject, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTwilioPhoneNumberDto {
  @ApiProperty({
    description: 'Credential ID for Twilio provider',
    example: 'credential_twilio_123'
  })
  @IsString()
  credentialId: string;

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
    example: 'Twilio Business Line',
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the phone number',
    example: 'Twilio-powered business line',
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
    description: 'Provider type',
    example: 'twilio-phone-number'
  })
  @IsString()
  provider: 'twilio-phone-number';

  @ApiProperty({
    description: 'Twilio Account SID',
    required: false
  })
  @IsOptional()
  @IsString()
  accountSid?: string;

  @ApiProperty({
    description: 'Twilio Application SID',
    required: false
  })
  @IsOptional()
  @IsString()
  applicationSid?: string;

  @ApiProperty({
    description: 'Voice URL for incoming calls',
    example: 'https://example.com/voice',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceUrl?: string;

  @ApiProperty({
    description: 'SMS URL for incoming messages',
    example: 'https://example.com/sms',
    required: false
  })
  @IsOptional()
  @IsString()
  smsUrl?: string;

  @ApiProperty({
    description: 'Status callback URL',
    example: 'https://example.com/status',
    required: false
  })
  @IsOptional()
  @IsString()
  statusCallback?: string;

  @ApiProperty({
    description: 'Voice method for HTTP requests',
    example: 'POST',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceMethod?: string;

  @ApiProperty({
    description: 'SMS method for HTTP requests',
    example: 'POST',
    required: false
  })
  @IsOptional()
  @IsString()
  smsMethod?: string;

  @ApiProperty({
    description: 'Voice fallback URL',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceFallbackUrl?: string;

  @ApiProperty({
    description: 'SMS fallback URL',
    required: false
  })
  @IsOptional()
  @IsString()
  smsFallbackUrl?: string;

  @ApiProperty({
    description: 'Voice fallback method',
    example: 'POST',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceFallbackMethod?: string;

  @ApiProperty({
    description: 'SMS fallback method',
    example: 'POST',
    required: false
  })
  @IsOptional()
  @IsString()
  smsFallbackMethod?: string;

  @ApiProperty({
    description: 'Voice caller ID lookup',
    example: 'true',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceCallerIdLookup?: string;

  @ApiProperty({
    description: 'Voice receive mode',
    example: 'voice',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceReceiveMode?: string;

  @ApiProperty({
    description: 'Address requirements',
    example: 'none',
    required: false
  })
  @IsOptional()
  @IsString()
  addressRequirements?: string;

  @ApiProperty({
    description: 'Beta phone number flag',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  beta?: boolean;

  @ApiProperty({
    description: 'Emergency address SID',
    required: false
  })
  @IsOptional()
  @IsString()
  emergencyAddressSid?: string;

  @ApiProperty({
    description: 'Emergency status',
    example: 'Active',
    required: false
  })
  @IsOptional()
  @IsString()
  emergencyStatus?: string;

  @ApiProperty({
    description: 'Identity SID',
    required: false
  })
  @IsOptional()
  @IsString()
  identitySid?: string;

  @ApiProperty({
    description: 'Origin of the phone number',
    example: 'twilio',
    required: false
  })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiProperty({
    description: 'Trunk SID',
    required: false
  })
  @IsOptional()
  @IsString()
  trunkSid?: string;

  @ApiProperty({
    description: 'Friendly name',
    example: 'My Twilio Number',
    required: false
  })
  @IsOptional()
  @IsString()
  friendlyName?: string;

  @ApiProperty({
    description: 'Phone number SID from Twilio',
    required: false
  })
  @IsOptional()
  @IsString()
  phoneNumberSid?: string;

  @ApiProperty({
    description: 'URI of the phone number resource',
    required: false
  })
  @IsOptional()
  @IsString()
  uri?: string;

  @ApiProperty({
    description: 'Voice application SID',
    required: false
  })
  @IsOptional()
  @IsString()
  voiceApplicationSid?: string;

  @ApiProperty({
    description: 'SMS application SID',
    required: false
  })
  @IsOptional()
  @IsString()
  smsApplicationSid?: string;

  @ApiProperty({
    description: 'Status callback event',
    required: false
  })
  @IsOptional()
  @IsString()
  statusCallbackEvent?: string;

  @ApiProperty({
    description: 'Status callback URL',
    required: false
  })
  @IsOptional()
  @IsString()
  statusCallbackUrl?: string;

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
