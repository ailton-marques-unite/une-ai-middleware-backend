import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsString, 
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  ValidateNested,
 } from 'class-validator';
import { WebhookConfig, RabbitmqConfig, SqsConfig } from '../../domain/entities/instance.entity';
export class CreateInstanceDto {
  @ApiProperty({ description: 'The name of the instance' })
  @IsString()
  @IsNotEmpty()
  instanceName: string;

  @ApiProperty({ description: 'The integration of the instance' })
  @IsString()
  @IsNotEmpty()
  integration: string;

  @ApiProperty({ description: 'The token of the instance' })
  @IsString()
  @IsOptional()
  token: string;

  @ApiProperty({ description: 'The qrcode of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  qrcode: boolean;

  @ApiProperty({ description: 'The number of the instance' })
  @IsString()
  @IsOptional()
  number: string;

  @ApiProperty({ description: 'The rejectCall of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  rejectCall: boolean;

  @ApiProperty({ description: 'The msgCall of the instance' })
  @IsString()
  @IsNotEmpty()
  msgCall: string;

  @ApiProperty({ description: 'The groupsIgnore of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  groupsIgnore: boolean;

  @ApiProperty({ description: 'The alwaysOnline of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  alwaysOnline: boolean;

  @ApiProperty({ description: 'The readMessages of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  readMessages: boolean;

  @ApiProperty({ description: 'The readStatus of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  readStatus: boolean;

  @ApiProperty({ description: 'The syncFullHistory of the instance' })
  @IsBoolean()
  @IsNotEmpty()
  syncFullHistory: boolean;

  @ApiProperty({ description: 'The proxyHost of the instance' })
  @IsString()
  @IsOptional()
  proxyHost: string;

  @ApiProperty({ description: 'The proxyPort of the instance' })
  @IsString()
  @IsOptional()
  proxyPort: string;

  @ApiProperty({ description: 'The proxyProtocol of the instance' })
  @IsString()
  @IsOptional()
  proxyProtocol: string;

  @ApiProperty({ description: 'The proxyUsername of the instance' })
  @IsString()
  @IsOptional()
  proxyUsername: string;

  @ApiProperty({ description: 'The proxyPassword of the instance' })
  @IsString()
  @IsOptional()
  proxyPassword: string;

  @ApiProperty({ description: 'The webhook of the instance' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => WebhookConfig)
  webhook?: WebhookConfig;

  @ApiProperty({ description: 'The rabbitmq of the instance' })
  @IsOptional()
  @ValidateNested()
  @Type(() => RabbitmqConfig)
  rabbitmq?: RabbitmqConfig;

  @ApiProperty({ description: 'The sqs of the instance' })
  @IsOptional()
  @ValidateNested()
  @Type(() => SqsConfig)
  sqs?: SqsConfig;

  @ApiProperty({ description: 'The chatwootAccountId of the instance' })
  @IsNumber()
  @IsOptional()
  chatwootAccountId: number;
  
  @ApiProperty({ description: 'The chatwootToken of the instance' })
  @IsString()
  @IsOptional()
  chatwootToken: string;

  @ApiProperty({ description: 'The chatwootUrl of the instance' })
  @IsString()
  @IsOptional()
  chatwootUrl: string;

  @ApiProperty({ description: 'The chatwootSignMsg of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootSignMsg: boolean;

  @ApiProperty({ description: 'The chatwootReopenConversation of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootReopenConversation: boolean;

  @ApiProperty({ description: 'The chatwootConversationPending of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootConversationPending: boolean;

  @ApiProperty({ description: 'The chatwootImportContacts of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootImportContacts: boolean;  

  @ApiProperty({ description: 'The chatwootNameInbox of the instance' })
  @IsString()
  @IsOptional()   
  chatwootNameInbox: string;

  @ApiProperty({ description: 'The chatwootMergeBrazilContacts of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootMergeBrazilContacts: boolean;

  @ApiProperty({ description: 'The chatwootImportMessages of the instance' })
  @IsBoolean()
  @IsOptional()
  chatwootImportMessages: boolean;

  @ApiProperty({ description: 'The chatwootDaysLimitImportMessages of the instance' })
  @IsNumber()
  @IsOptional()
  chatwootDaysLimitImportMessages: number;

  @ApiProperty({ description: 'The chatwootOrganization of the instance' })
  @IsString()
  @IsOptional()
  chatwootOrganization: string;

  @ApiProperty({ description: 'The chatwootLogo of the instance' })
  @IsString()
  @IsOptional()
  chatwootLogo: string;
}
