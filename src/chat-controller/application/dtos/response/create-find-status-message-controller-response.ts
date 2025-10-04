import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FoundStatusMessageDto {
  @ApiProperty({ description: 'Internal unique identifier', example: '<string>' })
  _id: string;

  @ApiProperty({ description: 'Message unique identifier', example: '<string>' })
  id: string;

  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  remoteJid: string;

  @ApiProperty({ description: 'Whether the message was sent by the user', example: true })
  fromMe: boolean;

  @ApiPropertyOptional({ description: 'Message type (text, image, audio, etc.)', example: 'text' })
  type?: string;

  @ApiPropertyOptional({ description: 'Text content when applicable', example: '<string>' })
  text?: string;

  @ApiPropertyOptional({ description: 'UNIX timestamp (ms) when available', example: 1717000000000 })
  timestamp?: number;
}

export class CreateFindStatusMessageControllerResponseDto {
  @ApiProperty({
    description: 'List of status messages matching the filter',
    type: [FoundStatusMessageDto],
    example: [
      {
        _id: '<string>',
        id: '<string>',
        remoteJid: '<string>',
        fromMe: true,
        type: 'text',
        text: 'Status update',
        timestamp: 1717000000000
      }
    ]
  })
  messages: FoundStatusMessageDto[];

  @ApiProperty({ description: 'Total number of status messages found', example: 1 })
  total: number;
}


