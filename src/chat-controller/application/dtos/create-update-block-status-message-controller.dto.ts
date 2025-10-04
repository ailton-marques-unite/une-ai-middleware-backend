import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUpdateBlockStatusMessageControllerDto {
  @ApiProperty({
    description: 'The phone number to update block status for',
    example: '1234567890'
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'The block status to set for the number',
    example: 'blocked'
  })
  @IsString()
  status: string;
}
