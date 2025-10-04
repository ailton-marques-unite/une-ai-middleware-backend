import { ApiProperty } from '@nestjs/swagger';

export class CheckWhatsappNumberResult {
  @ApiProperty({
    description: 'The phone number that was checked',
    example: '+1234567890'
  })
  number: string;

  @ApiProperty({
    description: 'Whether the number is a WhatsApp number',
    example: true
  })
  isWhatsapp: boolean;

  @ApiProperty({
    description: 'Additional information about the number status',
    example: 'Number is registered on WhatsApp',
    required: false
  })
  message?: string;
}

export class CreateCheckIsWhatsappNumberControllerResponseDto {
  @ApiProperty({
    description: 'Array of results for each checked phone number',
    type: [CheckWhatsappNumberResult],
    example: [
      {
        number: '+1234567890',
        isWhatsapp: true,
        message: 'Number is registered on WhatsApp'
      },
      {
        number: '+0987654321',
        isWhatsapp: false,
        message: 'Number is not registered on WhatsApp'
      }
    ]
  })
  results: CheckWhatsappNumberResult[];

  @ApiProperty({
    description: 'Total count of numbers checked',
    example: 2
  })
  totalChecked: number;

  @ApiProperty({
    description: 'Count of numbers that are WhatsApp numbers',
    example: 1
  })
  whatsappCount: number;
}
