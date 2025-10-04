import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSendStatusMessageDto {
  @ApiProperty({ description: 'Type of the status content', example: 'text' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Main content of the status', example: '<string>' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'Optional caption for media or content', example: '<string>' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ description: 'Background color (hex or name)', example: '<string>' })
  @IsOptional()
  @IsString()
  backgroundColor?: string;

  @ApiPropertyOptional({ description: 'Font identifier for text status', example: 123 })
  @IsOptional()
  @IsNumber()
  font?: number;

  @ApiPropertyOptional({ description: 'Send to all contacts', example: true })
  @IsOptional()
  @IsBoolean()
  allContacts?: boolean;

  @ApiPropertyOptional({ description: 'Specific status JIDs to send to', example: ['{{remoteJID}}'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  statusJidList?: string[];
}


