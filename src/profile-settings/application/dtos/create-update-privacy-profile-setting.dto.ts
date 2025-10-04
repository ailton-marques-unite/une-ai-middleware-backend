import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateUpdatePrivacyProfileSettingDto {
  @ApiProperty({ 
    description: 'Read receipts privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  readreceipts?: string;

  @ApiProperty({ 
    description: 'Profile photo privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiProperty({ 
    description: 'Status privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ 
    description: 'Online status privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  online?: string;

  @ApiProperty({ 
    description: 'Last seen privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  last?: string;

  @ApiProperty({ 
    description: 'Group add privacy setting', 
    example: 'all',
    enum: ['all', 'contacts', 'none']
  })
  @IsString()
  @IsOptional()
  groupadd?: string;
}
