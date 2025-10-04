import { ApiProperty } from '@nestjs/swagger';

export class MarkMessageUnreadResult {
  @ApiProperty({
    description: 'The remote JID (chat identifier)',
    example: '1234567890@s.whatsapp.net'
  })
  remoteJid: string;

  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '3EB0C767D26A8B4A'
  })
  id: string;

  @ApiProperty({
    description: 'Whether the message was successfully marked as unread',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Message marked as unread successfully',
    required: false
  })
  message?: string;
}

export class CreateMarkMessageUnreadControllerResponseDto {
  @ApiProperty({
    description: 'Array of results for each message marked as unread',
    type: [MarkMessageUnreadResult],
    example: [
      {
        remoteJid: '1234567890@s.whatsapp.net',
        id: '3EB0C767D26A8B4A',
        success: true,
        message: 'Message marked as unread successfully'
      }
    ]
  })
  results: MarkMessageUnreadResult[];

  @ApiProperty({
    description: 'The chat identifier that was processed',
    example: '1234567890@s.whatsapp.net'
  })
  chat: string;

  @ApiProperty({
    description: 'Total count of messages processed',
    example: 1
  })
  totalProcessed: number;

  @ApiProperty({
    description: 'Count of messages successfully marked as unread',
    example: 1
  })
  successCount: number;

  @ApiProperty({
    description: 'Count of messages that failed to be marked as unread',
    example: 0
  })
  failureCount: number;
}
