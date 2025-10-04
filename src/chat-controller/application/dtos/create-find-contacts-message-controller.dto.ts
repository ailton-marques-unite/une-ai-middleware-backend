import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class WhereDto {
  @ApiProperty({ description: 'Contact unique identifier', example: '<string>' })
  @IsString()
  id: string;
}

export class CreateFindContactsMessageControllerDto {
  @ApiProperty({
    description: 'Filter criteria to find a contact',
    type: WhereDto,
    example: {
      where: {
        id: '<string>'
      }
    }
  })
  @ValidateNested()
  @Type(() => WhereDto)
  where: WhereDto;
}


