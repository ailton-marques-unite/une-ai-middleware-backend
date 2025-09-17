import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AssistantService } from '../assistant.service';
import { AssistantRepository } from '../../../infrastructure/repositories/assistant.repository';
import { Assistant } from '../../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../../dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../dtos/list-assistants-query.dto';

describe('AssistantService', () => {
  let service: AssistantService;
  let repository: jest.Mocked<AssistantRepository>;

  const mockAssistant: Assistant = {
    id: '1',
    orgId: 'org-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    name: 'Test Assistant',
  };

  const mockRepository: jest.Mocked<AssistantRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssistantService,
        {
          provide: AssistantRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AssistantService>(AssistantService);
    repository = module.get(AssistantRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all assistants', async () => {
      const query: ListAssistantsQueryDto = { limit: 10 };
      const expectedAssistants = [mockAssistant];

      repository.findAll.mockResolvedValue(expectedAssistants);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedAssistants);
    });
  });

  describe('findById', () => {
    it('should return assistant when found', async () => {
      repository.findById.mockResolvedValue(mockAssistant);

      const result = await service.findById('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockAssistant);
    });

    it('should throw NotFoundException when assistant not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return new assistant', async () => {
      const createDto: CreateAssistantDto = { name: 'New Assistant' };
      repository.create.mockResolvedValue(mockAssistant);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('update', () => {
    it('should update and return assistant when found', async () => {
      const updateDto: UpdateAssistantDto = { name: 'Updated Assistant' };
      const updatedAssistant = { ...mockAssistant, ...updateDto };

      repository.findById.mockResolvedValue(mockAssistant);
      repository.update.mockResolvedValue(updatedAssistant);

      const result = await service.update('1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedAssistant);
    });

    it('should throw NotFoundException when assistant not found', async () => {
      const updateDto: UpdateAssistantDto = { name: 'Updated Assistant' };
      repository.findById.mockResolvedValue(null);

      await expect(service.update('1', updateDto)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('delete', () => {
    it('should delete assistant when found', async () => {
      repository.findById.mockResolvedValue(mockAssistant);
      repository.delete.mockResolvedValue();

      await service.delete('1');

      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when assistant not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });
});