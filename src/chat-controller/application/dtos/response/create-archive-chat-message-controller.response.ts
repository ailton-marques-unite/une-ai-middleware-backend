import { ApiProperty } from '@nestjs/swagger';

export class ArchiveChatMessageResult {
  @ApiProperty({
    description: 'The chat identifier that was processed',
    example: '1234567890@s.whatsapp.net'
  })
  chat: string;

  @ApiProperty({
    description: 'The unique identifier of the last message',
    example: '3EB0C767D26A8B4A'
  })
  messageId: string;

  @ApiProperty({
    description: 'Whether the chat was successfully archived/unarchived',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'The archive status after the operation',
    example: true
  })
  archived: boolean;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Chat archived successfully',
    required: false
  })
  message?: string;
}

export class CreateArchiveChatMessageControllerResponseDto {
  @ApiProperty({
    description: 'The result of the archive chat operation',
    type: ArchiveChatMessageResult,
    example: {
      chat: '1234567890@s.whatsapp.net',
      messageId: '3EB0C767D26A8B4A',
      success: true,
      archived: true,
      message: 'Chat archived successfully'
    }
  })
  result: ArchiveChatMessageResult;

  @ApiProperty({
    description: 'The original archive request status',
    example: true
  })
  requestedArchive: boolean;
}
