import { Test, TestingModule } from '@nestjs/testing';
import { ToolController } from '../tool.controller';
import { ToolService } from '../../../application/services/tool.service';
import { CreateToolDto } from '../../../application/dtos/create-tool.dto';
import { UpdateToolDto } from '../../../application/dtos/update-tool.dto';
import { ListToolsQueryDto } from '../../../application/dtos/list-tools-query.dto';
import { ToolResponseDto } from '../../../application/dtos/tool-response.dto';
import { ToolType, ToolStatus, HttpMethod } from '../../../domain/entities/tool.entity';

describe('ToolController', () => {
  let controller: ToolController;
  let service: jest.Mocked<ToolService>;

  const mockToolResponse: ToolResponseDto = {
    id: 'tool_1',
    orgId: 'org_1',
    name: 'Weather API Tool',
    description: 'Get current weather information for any location',
    type: ToolType.API,
    status: ToolStatus.ACTIVE,
    endpoint: {
      url: 'https://api.weather.com/v1/current',
      method: HttpMethod.GET,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      retryCount: 3,
      retryDelay: 1000,
    },
    authentication: {
      type: 'api-key',
      apiKey: 'weather-api-key-123',
      headers: {
        'X-API-Key': 'weather-api-key-123',
      },
    },
    version: '1.0.0',
    category: 'weather',
    tags: ['weather', 'api', 'location'],
    configuration: {
      units: 'metric',
      language: 'en',
    },
    metadata: {
      provider: 'WeatherAPI',
      documentation: 'https://docs.weatherapi.com',
    },
    isPublic: true,
    author: 'system',
    documentation: 'Get current weather data for any location worldwide',
    icon: 'weather-icon.png',
    usageCount: 1250,
    successRate: 98.5,
    averageResponseTime: 250,
    lastUsedAt: '2024-01-15T10:30:00Z',
    enabled: true,
    environment: 'production',
    region: 'us-east-1',
    permissions: ['read'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  };

  const mockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolController],
      providers: [
        {
          provide: ToolService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ToolController>(ToolController);
    service = module.get(ToolService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tool', async () => {
      const createDto: CreateToolDto = {
        name: 'Test Tool',
        description: 'A test tool for unit testing',
        type: ToolType.FUNCTION,
        version: '1.0.0',
        category: 'test',
        tags: ['test'],
        enabled: true,
      };

      service.create.mockResolvedValue(mockToolResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockToolResponse);
    });
  });

  describe('findAll', () => {
    it('should return all tools', async () => {
      const query: ListToolsQueryDto = { limit: 10 };
      service.findAll.mockResolvedValue([mockToolResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockToolResponse]);
    });

    it('should return filtered tools', async () => {
      const query: ListToolsQueryDto = {
        status: ToolStatus.ACTIVE,
        type: ToolType.API,
        limit: 5,
      };
      service.findAll.mockResolvedValue([mockToolResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockToolResponse]);
    });
  });

  describe('findOne', () => {
    it('should return a tool by id', async () => {
      service.findById.mockResolvedValue(mockToolResponse);

      const result = await controller.findOne('tool_1');

      expect(service.findById).toHaveBeenCalledWith('tool_1');
      expect(result).toEqual(mockToolResponse);
    });
  });

  describe('update', () => {
    it('should update a tool', async () => {
      const updateDto: UpdateToolDto = {
        description: 'Updated description',
        version: '2.0.0',
      };

      const updatedResponse = {
        ...mockToolResponse,
        description: 'Updated description',
        version: '2.0.0',
      };

      service.update.mockResolvedValue(updatedResponse);

      const result = await controller.update('tool_1', updateDto);

      expect(service.update).toHaveBeenCalledWith('tool_1', updateDto);
      expect(result).toEqual(updatedResponse);
    });
  });

  describe('remove', () => {
    it('should delete a tool', async () => {
      service.delete.mockResolvedValue(undefined);

      await controller.remove('tool_1');

      expect(service.delete).toHaveBeenCalledWith('tool_1');
    });
  });
});
