import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CampaignService } from '../campaign.service';
import { CampaignRepository } from '../../../infrastructure/repositories/campaign.repository';
import { Campaign, CampaignStatus, CampaignType } from '../../../domain/entities/campaign.entity';
import { CreateCampaignDto } from '../../dtos/create-campaign.dto';
import { UpdateCampaignDto } from '../../dtos/update-campaign.dto';
import { ListCampaignsQueryDto } from '../../dtos/list-campaigns-query.dto';

describe('CampaignService', () => {
  let service: CampaignService;
  let repository: jest.Mocked<CampaignRepository>;

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
    const mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    repository = module.get(CampaignRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all campaigns', async () => {
      const query: ListCampaignsQueryDto = { limit: 10 };
      const expectedCampaigns = [mockCampaign];

      repository.findAll.mockResolvedValue(expectedCampaigns);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedCampaigns);
    });
  });

  describe('findById', () => {
    it('should return campaign when found', async () => {
      repository.findById.mockResolvedValue(mockCampaign);

      const result = await service.findById('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCampaign);
    });

    it('should throw NotFoundException when campaign not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return new campaign', async () => {
      const createDto: CreateCampaignDto = { 
        name: 'New Campaign',
        type: CampaignType.OUTBOUND,
        assistantId: 'assistant-1',
      };
      repository.create.mockResolvedValue(mockCampaign);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCampaign);
    });
  });

  describe('update', () => {
    it('should update and return campaign when found', async () => {
      const updateDto: UpdateCampaignDto = { status: CampaignStatus.RUNNING };
      const updatedCampaign = { ...mockCampaign, ...updateDto };

      repository.findById.mockResolvedValue(mockCampaign);
      repository.update.mockResolvedValue(updatedCampaign);

      const result = await service.update('1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedCampaign);
    });

    it('should throw NotFoundException when campaign not found', async () => {
      const updateDto: UpdateCampaignDto = { status: CampaignStatus.RUNNING };
      repository.findById.mockResolvedValue(null);

      await expect(service.update('1', updateDto)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('delete', () => {
    it('should delete campaign when found', async () => {
      repository.findById.mockResolvedValue(mockCampaign);
      repository.delete.mockResolvedValue();

      await service.delete('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when campaign not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });
});
