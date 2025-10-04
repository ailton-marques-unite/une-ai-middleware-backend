import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateCheckIsWhatsappNumberControllerDto {
  @ApiProperty({ 
    description: 'Array of phone numbers to check if they are WhatsApp numbers',
    type: [String],
    example: ['<string>']
  })
  @IsArray()
  @IsString({ each: true })
  numbers: string[];
}
