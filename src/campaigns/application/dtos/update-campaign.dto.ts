import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaign.dto';
import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { CampaignStatus } from '../../domain/entities/campaign.entity';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsString()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
