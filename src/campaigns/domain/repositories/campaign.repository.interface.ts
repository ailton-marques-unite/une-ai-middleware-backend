import { Campaign } from '../entities/campaign.entity';
import { CreateCampaignDto } from '../../application/dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../../application/dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../../application/dtos/list-campaigns-query.dto';

export interface CampaignRepositoryInterface {
  findAll(query: ListCampaignsQueryDto): Promise<Campaign[]>;
  findById(id: string): Promise<Campaign | null>;
  create(data: CreateCampaignDto): Promise<Campaign>;
  update(id: string, data: UpdateCampaignDto): Promise<Campaign>;
  delete(id: string): Promise<void>;
}
