import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class SetPresenceDto {
  @ApiProperty({ 
    description: 'The presence status of the instance',
    enum: ['available', 'unavailable', 'composing', 'recording', 'paused'],
    example: 'available'
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['available', 'unavailable', 'composing', 'recording', 'paused'])
  presence: string;
}
