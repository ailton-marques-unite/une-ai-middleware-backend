import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../../../application/services/campaign.service';
import { Campaign, CampaignStatus, CampaignType } from '../../../domain/entities/campaign.entity';
import { CreateCampaignDto } from '../../../application/dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../../../application/dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../../../application/dtos/list-campaigns-query.dto';

describe('CampaignController', () => {
  let controller: CampaignController;
  let service: jest.Mocked<CampaignService>;

  const mockCampaign: Campaign = {
    id: '1',
    orgId: 'org-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    name: 'Test Campaign',
    status: CampaignStatus.DRAFT,
    type: CampaignType.OUTBOUND,
    assistantId: 'assistant-1',
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
    service = module.get(CampaignService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new campaign', async () => {
      const createDto: CreateCampaignDto = { 
        name: 'New Campaign',
        type: CampaignType.OUTBOUND,
        assistantId: 'assistant-1',
      };
      service.create.mockResolvedValue(mockCampaign);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('findAll', () => {
    it('should return all campaigns', async () => {
      const query: ListCampaignsQueryDto = { limit: 10 };
      const expectedCampaigns = [mockCampaign];

      service.findAll.mockResolvedValue(expectedCampaigns);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedCampaigns);
    });
  });

  describe('findOne', () => {
    it('should return campaign by id', async () => {
      service.findById.mockResolvedValue(mockCampaign);

      const result = await controller.findOne('1');

      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('update', () => {
    it('should update campaign by id', async () => {
      const updateDto: UpdateCampaignDto = { status: CampaignStatus.RUNNING };
      const updatedCampaign = { ...mockCampaign, ...updateDto };

      service.update.mockResolvedValue(updatedCampaign);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedCampaign);
    });
  });

  describe('remove', () => {
    it('should delete campaign by id', async () => {
      service.delete.mockResolvedValue();

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
