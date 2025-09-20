import {
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
  Max,
  IsEnum,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CampaignStatus,
  CampaignType,
} from '../../domain/entities/campaign.entity';

export class ListCampaignsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  limit?: number = 100;

  @IsOptional()
  @IsDateString()
  createdAtGt?: string;

  @IsOptional()
  @IsDateString()
  createdAtLt?: string;

  @IsOptional()
  @IsDateString()
  createdAtGe?: string;

  @IsOptional()
  @IsDateString()
  createdAtLe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLt?: string;

  @IsOptional()
  @IsDateString()
  updatedAtGe?: string;

  @IsOptional()
  @IsDateString()
  updatedAtLe?: string;

  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsEnum(CampaignType)
  type?: CampaignType;

  @IsOptional()
  @IsString()
  assistantId?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  campaignGroupId?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
