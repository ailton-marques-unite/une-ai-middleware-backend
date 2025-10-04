import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MessageKeyDto {
  @ApiProperty({ description: 'Remote JID (chat identifier)', example: '<string>' })
  remoteJid: string;
}

class FoundMessageDto {
  @ApiProperty({ description: 'Message unique identifier', example: '<string>' })
  id: string;

  @ApiProperty({ description: 'Message key information', type: MessageKeyDto })
  key: MessageKeyDto;

  @ApiPropertyOptional({ description: 'Message type (text, image, audio, etc.)', example: 'text' })
  type?: string;

  @ApiPropertyOptional({ description: 'Text content when applicable', example: '<string>' })
  text?: string;

  @ApiPropertyOptional({ description: 'Sender JID or identifier', example: '<string>' })
  sender?: string;

  @ApiPropertyOptional({ description: 'Whether the message was sent by the user', example: true })
  fromMe?: boolean;

  @ApiPropertyOptional({ description: 'UNIX timestamp (ms) when available', example: 1717000000000 })
  timestamp?: number;
}

export class CreateFindMessagesMessageControllerResponseDto {
  @ApiProperty({
    description: 'List of messages matching the filter',
    type: [FoundMessageDto],
    example: [
      {
        id: '<string>',
        key: { remoteJid: '<string>' },
        type: 'text',
        text: 'Hello there',
        sender: '<string>',
        fromMe: false,
        timestamp: 1717000000000
      }
    ]
  })
  messages: FoundMessageDto[];

  @ApiProperty({ description: 'Total number of messages found', example: 1 })
  total: number;
}


