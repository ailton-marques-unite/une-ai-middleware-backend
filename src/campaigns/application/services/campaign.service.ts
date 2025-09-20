import { Injectable, NotFoundException } from '@nestjs/common';
import { Campaign } from '../../domain/entities/campaign.entity';
import { CreateCampaignDto } from '../dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../dtos/list-campaigns-query.dto';
import { CampaignRepository } from '../../infrastructure/repositories/campaign.repository';
import { CampaignServiceInterface } from './campaign.service.interface';

@Injectable()
export class CampaignService implements CampaignServiceInterface {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async findAll(query: ListCampaignsQueryDto): Promise<Campaign[]> {
    return this.campaignRepository.findAll(query);
  }

  async findById(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async create(data: CreateCampaignDto): Promise<Campaign> {
    return this.campaignRepository.create(data);
  }

  async update(id: string, data: UpdateCampaignDto): Promise<Campaign> {
    const existingCampaign = await this.findById(id);
    if (!existingCampaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return this.campaignRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const existingCampaign = await this.findById(id);
    if (!existingCampaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return this.campaignRepository.delete(id);
  }
}
