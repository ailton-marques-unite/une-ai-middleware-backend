import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlockStatusMessageResult {
  @ApiProperty({
    description: 'The phone number that was updated',
    example: '1234567890'
  })
  number: string;

  @ApiProperty({
    description: 'The new block status that was set',
    example: 'blocked'
  })
  status: string;

  @ApiProperty({
    description: 'Whether the block status was successfully updated',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'The timestamp when the status was updated',
    example: '2024-01-15T10:30:00.000Z'
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Additional information about the operation result',
    example: 'Block status updated successfully',
    required: false
  })
  message?: string;
}

export class CreateUpdateBlockStatusMessageControllerResponseDto {
  @ApiProperty({
    description: 'The result of the block status update operation',
    type: UpdateBlockStatusMessageResult,
    example: {
      number: '1234567890',
      status: 'blocked',
      success: true,
      updatedAt: '2024-01-15T10:30:00.000Z',
      message: 'Block status updated successfully'
    }
  })
  result: UpdateBlockStatusMessageResult;

  @ApiProperty({
    description: 'The original phone number from the request',
    example: '1234567890'
  })
  originalNumber: string;
}
