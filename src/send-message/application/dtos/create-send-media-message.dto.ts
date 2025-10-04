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

export class CreateSendMediaMessageDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Media type (image, video, audio, document, etc.)', example: '<string>' })
  @IsString()
  mediatype: string;

  @ApiPropertyOptional({ description: 'MIME type of the media', example: '<string>' })
  @IsOptional()
  @IsString()
  mimetype?: string;

  @ApiPropertyOptional({ description: 'Caption for the media', example: '<string>' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiProperty({ description: 'Media content (URL or base64)', example: '<string>' })
  @IsString()
  media: string;

  @ApiPropertyOptional({ description: 'Filename to use when sending document media', example: '<string>' })
  @IsOptional()
  @IsString()
  fileName?: string;

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


