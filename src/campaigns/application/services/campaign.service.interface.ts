import { Campaign } from '../../domain/entities/campaign.entity';
import { CreateCampaignDto } from '../dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../dtos/list-campaigns-query.dto';

export interface CampaignServiceInterface {
  findAll(query: ListCampaignsQueryDto): Promise<Campaign[]>;
  findById(id: string): Promise<Campaign>;
  create(data: CreateCampaignDto): Promise<Campaign>;
  update(id: string, data: UpdateCampaignDto): Promise<Campaign>;
  delete(id: string): Promise<void>;
}
