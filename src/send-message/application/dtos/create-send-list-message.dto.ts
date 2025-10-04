import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class RowDto {
  @ApiProperty({ description: 'Row title', example: '<string>' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Row description', example: '<string>' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Row ID', example: '<string>' })
  @IsString()
  rowId: string;
}

class SectionDto {
  @ApiProperty({ description: 'Section title', example: '<string>' })
  @IsString()
  title: string;

  @ApiProperty({ 
    description: 'Array of rows in this section', 
    type: [RowDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RowDto)
  rows: RowDto[];
}

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

export class CreateSendListMessageDto {
  @ApiProperty({ description: 'Recipient phone number (JID or MSISDN)', example: '<string>' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'List title', example: '<string>' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'List description', example: '<string>' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Button text', example: '<string>' })
  @IsString()
  buttonText: string;

  @ApiProperty({ description: 'Footer text', example: '<string>' })
  @IsString()
  footerText: string;

  @ApiProperty({ 
    description: 'Array of list sections with rows', 
    type: [SectionDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  values: SectionDto[];

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
