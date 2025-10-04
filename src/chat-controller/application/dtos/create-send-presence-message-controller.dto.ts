import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum PresenceType {
  COMPOSING = 'composing',
  RECORDING = 'recording',
  PAUSED = 'paused',
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable'
}

export class PresenceOptionsDto {
  @ApiProperty({
    description: 'The delay in milliseconds before sending the presence',
    example: 123
  })
  @IsNumber()
  delay: number;

  @ApiProperty({
    description: 'The presence type to send',
    enum: PresenceType,
    example: PresenceType.COMPOSING
  })
  @IsEnum(PresenceType)
  presence: PresenceType;

  @ApiProperty({
    description: 'The phone number for the presence',
    example: '1234567890'
  })
  @IsString()
  number: string;
}

export class CreateSendPresenceMessageControllerDto {
  @ApiProperty({
    description: 'The phone number to send presence to',
    example: '1234567890'
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'The presence options containing delay, presence type, and number',
    type: PresenceOptionsDto
  })
  @ValidateNested()
  @Type(() => PresenceOptionsDto)
  options: PresenceOptionsDto;
}
