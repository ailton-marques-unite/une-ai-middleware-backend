import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from '../assistant.controller';
import { AssistantService } from '../../../application/services/assistant.service';
import { Assistant } from '../../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../../../application/dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../../application/dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../../application/dtos/list-assistants-query.dto';

describe('AssistantController', () => {
  let controller: AssistantController;
  let service: jest.Mocked<AssistantService>;

  const mockAssistant: Assistant = {
    id: '1',
    orgId: 'org-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    name: 'Test Assistant',
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
      controllers: [AssistantController],
      providers: [
        {
          provide: AssistantService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AssistantController>(AssistantController);
    service = module.get(AssistantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new assistant', async () => {
      const createDto: CreateAssistantDto = { name: 'New Assistant' };
      service.create.mockResolvedValue(mockAssistant);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('findAll', () => {
    it('should return all assistants', async () => {
      const query: ListAssistantsQueryDto = { limit: 10 };
      const expectedAssistants = [mockAssistant];

      service.findAll.mockResolvedValue(expectedAssistants);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedAssistants);
    });
  });

  describe('findOne', () => {
    it('should return assistant by id', async () => {
      service.findById.mockResolvedValue(mockAssistant);

      const result = await controller.findOne('1');

      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('update', () => {
    it('should update assistant by id', async () => {
      const updateDto: UpdateAssistantDto = { name: 'Updated Assistant' };
      const updatedAssistant = { ...mockAssistant, ...updateDto };

      service.update.mockResolvedValue(updatedAssistant);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(updatedAssistant);
    });
  });

  describe('remove', () => {
    it('should delete assistant by id', async () => {
      service.delete.mockResolvedValue();

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
