import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CampaignController } from './infrastructure/controllers/campaign.controller';
import { CampaignService } from './application/services/campaign.service';
import { CampaignRepository } from './infrastructure/repositories/campaign.repository';

@Module({
  imports: [HttpModule],
  controllers: [CampaignController],
  providers: [CampaignRepository, CampaignService],
  exports: [CampaignService, CampaignRepository],
})
export class CampaignsModule {}
