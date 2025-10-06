import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatwootDto {
  @ApiPropertyOptional({ description: 'Enable or disable Chatwoot integration', example: true })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({ description: 'Chatwoot account identifier', example: '<string>' })
  @IsOptional()
  @IsString()
  accountId?: string;

  @ApiPropertyOptional({ description: 'Chatwoot access token', example: '<string>' })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiPropertyOptional({ description: 'Base URL of Chatwoot instance', example: '<string>' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ description: 'Append sign message to outgoing messages', example: true })
  @IsOptional()
  @IsBoolean()
  signMsg?: boolean;

  @ApiPropertyOptional({ description: 'Reopen conversation on new incoming message', example: true })
  @IsOptional()
  @IsBoolean()
  reopenConversation?: boolean;

  @ApiPropertyOptional({ description: 'Mark conversation as pending', example: true })
  @IsOptional()
  @IsBoolean()
  conversationPending?: boolean;

  @ApiPropertyOptional({ description: 'Name for the Chatwoot inbox', example: '<string>' })
  @IsOptional()
  @IsString()
  nameInbox?: string;

  @ApiPropertyOptional({ description: 'Merge Brazil phone contacts normalization', example: true })
  @IsOptional()
  @IsBoolean()
  mergeBrazilContacts?: boolean;

  @ApiPropertyOptional({ description: 'Import contacts to Chatwoot', example: true })
  @IsOptional()
  @IsBoolean()
  importContacts?: boolean;

  @ApiPropertyOptional({ description: 'Import messages to Chatwoot', example: true })
  @IsOptional()
  @IsBoolean()
  importMessages?: boolean;

  @ApiPropertyOptional({ description: 'Days limit when importing messages', example: 123 })
  @IsOptional()
  @IsNumber()
  daysLimitImportMessages?: number;

  @ApiPropertyOptional({ description: 'Delimiter used when signing messages', example: '<string>' })
  @IsOptional()
  @IsString()
  signDelimiter?: string;

  @ApiPropertyOptional({ description: 'Auto create resources as needed', example: true })
  @IsOptional()
  @IsBoolean()
  autoCreate?: boolean;

  @ApiPropertyOptional({ description: 'Organization name for Chatwoot', example: '<string>' })
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiPropertyOptional({ description: 'Logo URL or identifier for Chatwoot', example: '<string>' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ description: 'List of JIDs to ignore', example: ['<string>'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ignoreJids?: string[];
}
