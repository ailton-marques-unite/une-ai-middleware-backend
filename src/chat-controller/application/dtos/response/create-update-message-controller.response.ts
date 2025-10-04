import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageResult {
  @ApiProperty({
    description: 'The message number that was updated',
    example: 123
  })
  number: number;

  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '3EB0C767D26A8B4A'
  })
  messageId: string;

  @ApiProperty({
    description: 'The remote JID (chat identifier)',
    example: '1234567890@s.whatsapp.net'
  })
  remoteJid: string;

  @ApiProperty({
    description: 'The updated text content of the message',
    example: 'This is the updated message text'
  })
  updatedText: string;

  @ApiProperty({
    description: 'Whether the message was successfully updated',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Message updated successfully',
    required: false
  })
  message?: string;
}

export class CreateUpdateMessageControllerResponseDto {
  @ApiProperty({
    description: 'The result of the message update operation',
    type: UpdateMessageResult,
    example: {
      number: 123,
      messageId: '3EB0C767D26A8B4A',
      remoteJid: '1234567890@s.whatsapp.net',
      updatedText: 'This is the updated message text',
      success: true,
      message: 'Message updated successfully'
    }
  })
  result: UpdateMessageResult;

  @ApiProperty({
    description: 'The original message number from the request',
    example: 123
  })
  originalNumber: number;
}
