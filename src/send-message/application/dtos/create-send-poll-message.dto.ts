import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class QuotedKeyDto {
  @ApiProperty({ description: 'Quoted message id', example: '<string>' })
  @IsString()
  id: string;
}

class QuotedMessageDto {
  @ApiProperty({ description: 'Quoted text content', example: '<string>' })
  @IsString()
  conversation: string;
}

class QuotedDto {
  @ApiProperty({ description: 'Quoted message key', type: QuotedKeyDto })
  @ValidateNested()
  @Type(() => QuotedKeyDto)
  key: QuotedKeyDto;

  @ApiProperty({ description: 'Quoted message payload', type: QuotedMessageDto })
  @ValidateNested()
  @Type(() => QuotedMessageDto)
  message: QuotedMessageDto;
}

export class CreateSendPollMessageDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Poll name/title', example: '<string>' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of selectable options', example: 123 })
  @IsNumber()
  selectableCount: number;

  @ApiProperty({ 
    description: 'Array of poll options/values', 
    example: ['Question 1'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  values: string[];

  @ApiPropertyOptional({ description: 'Optional delay in milliseconds before sending', example: 123 })
  @IsOptional()
  @IsNumber()
  delay?: number;

  @ApiPropertyOptional({ description: 'Enable link preview in message', example: true })
  @IsOptional()
  @IsBoolean()
  linkPreview?: boolean;

  @ApiPropertyOptional({ description: 'Mention everyone in the chat (if supported)', example: true })
  @IsOptional()
  @IsBoolean()
  mentionsEveryOne?: boolean;

  @ApiPropertyOptional({ description: 'List of mentioned JIDs', example: ['{{remoteJID}}'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mentioned?: string[];

  @ApiPropertyOptional({ description: 'Quoted message (reply context)', type: QuotedDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => QuotedDto)
  quoted?: QuotedDto;
}
