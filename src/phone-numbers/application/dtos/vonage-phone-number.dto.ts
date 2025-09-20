import { IsString, IsOptional, IsObject, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVonagePhoneNumberDto {
  @ApiProperty({
    description: 'Credential ID for Vonage provider',
    example: 'credential_vonage_123'
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
    example: 'Vonage Business Line',
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the phone number',
    example: 'Vonage-powered business line',
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
    example: 'vonage-phone-number'
  })
  @IsString()
  provider: 'vonage-phone-number';

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
