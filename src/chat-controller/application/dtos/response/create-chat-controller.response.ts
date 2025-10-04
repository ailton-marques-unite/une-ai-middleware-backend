import { ApiProperty } from '@nestjs/swagger';

export class CreateChatControllerResult {
  @ApiProperty({
    description: 'The phone number that the chat was created for',
    example: '1234567890'
  })
  number: string;

  @ApiProperty({
    description: 'Whether the chat was successfully created',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'The chat identifier (JID) that was created',
    example: '1234567890@s.whatsapp.net'
  })
  chatId: string;

  @ApiProperty({
    description: 'The timestamp when the chat was created',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Chat created successfully',
    required: false
  })
  message?: string;
}

export class CreateChatControllerResponseDto {
  @ApiProperty({
    description: 'The result of the chat creation operation',
    type: CreateChatControllerResult,
    example: {
      number: '1234567890',
      success: true,
      chatId: '1234567890@s.whatsapp.net',
      createdAt: '2024-01-15T10:30:00.000Z',
      message: 'Chat created successfully'
    }
  })
  result: CreateChatControllerResult;

  @ApiProperty({
    description: 'The original phone number from the request',
    example: '1234567890'
  })
  originalNumber: string;
}
