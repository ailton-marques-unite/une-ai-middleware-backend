import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendStatusMessageResponse {
  @ApiProperty({ description: 'Type of the status content', example: 'text' })
  type: string;

  @ApiProperty({ description: 'Main content of the status', example: '<string>' })
  content: string;

  @ApiPropertyOptional({ description: 'Optional caption for media or content', example: '<string>' })
  caption?: string;

  @ApiPropertyOptional({ description: 'Background color (hex or name)', example: '<string>' })
  backgroundColor?: string;

  @ApiPropertyOptional({ description: 'Font identifier for text status', example: 123 })
  font?: number;

  @ApiPropertyOptional({ description: 'Send to all contacts', example: true })
  allContacts?: boolean;

  @ApiPropertyOptional({ description: 'Specific status JIDs to send to', example: ['{{remoteJID}}'], type: [String] })
  statusJidList?: string[];
}


