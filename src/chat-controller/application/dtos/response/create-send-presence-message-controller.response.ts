import { ApiProperty } from '@nestjs/swagger';
import { PresenceType } from '../create-send-presence-message-controller.dto';

export class SendPresenceMessageResult {
  @ApiProperty({
    description: 'The phone number that the presence was sent to',
    example: '1234567890'
  })
  number: string;

  @ApiProperty({
    description: 'The presence type that was sent',
    enum: PresenceType,
    example: PresenceType.COMPOSING
  })
  presence: PresenceType;

  @ApiProperty({
    description: 'The delay that was applied before sending the presence',
    example: 123
  })
  delay: number;

  @ApiProperty({
    description: 'Whether the presence was successfully sent',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'The timestamp when the presence was sent',
    example: '2024-01-15T10:30:00.000Z'
  })
  sentAt: string;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Presence sent successfully',
    required: false
  })
  message?: string;
}

export class CreateSendPresenceMessageControllerResponseDto {
  @ApiProperty({
    description: 'The result of the presence sending operation',
    type: SendPresenceMessageResult,
    example: {
      number: '1234567890',
      presence: 'composing',
      delay: 123,
      success: true,
      sentAt: '2024-01-15T10:30:00.000Z',
      message: 'Presence sent successfully'
    }
  })
  result: SendPresenceMessageResult;

  @ApiProperty({
    description: 'The original phone number from the request',
    example: '1234567890'
  })
  originalNumber: string;
}
