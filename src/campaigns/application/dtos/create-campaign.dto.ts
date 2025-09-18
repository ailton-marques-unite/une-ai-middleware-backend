import { IsString, IsOptional, IsObject, IsArray, IsBoolean, IsNumber, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CampaignType, CampaignTarget, CampaignSchedule, CampaignSettings } from '../../domain/entities/campaign.entity';

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(CampaignType)
  type: CampaignType;

  @IsString()
  assistantId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CampaignTarget)
  targets?: CampaignTarget[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CampaignSchedule)
  schedule?: CampaignSchedule;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampaignSettings)
  settings?: CampaignSettings;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsString()
  campaignGroupId?: string;
}
