import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ToolService } from '../tool.service';
import { ToolRepository } from '../../../infrastructure/repositories/tool.repository';
import { CreateToolDto } from '../../dtos/create-tool.dto';
import { UpdateToolDto } from '../../dtos/update-tool.dto';
import { ListToolsQueryDto } from '../../dtos/list-tools-query.dto';
import { Tool, ToolStatus, ToolType, HttpMethod } from '../../../domain/entities/tool.entity';

describe('ToolService', () => {
  let service: ToolService;
  let repository: jest.Mocked<ToolRepository>;

  const mockTool: Tool = {
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

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolService,
        {
          provide: ToolRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ToolService>(ToolService);
    repository = module.get(ToolRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tools', async () => {
      const query: ListToolsQueryDto = { limit: 10 };
      repository.findAll.mockResolvedValue([mockTool]);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: mockTool.id,
        orgId: mockTool.orgId,
        name: mockTool.name,
        description: mockTool.description,
        type: mockTool.type,
        status: mockTool.status,
        function: mockTool.function,
        endpoint: mockTool.endpoint,
        webhook: mockTool.webhook,
        authentication: mockTool.authentication,
        version: mockTool.version,
        category: mockTool.category,
        tags: mockTool.tags,
        configuration: mockTool.configuration,
        metadata: mockTool.metadata,
        isPublic: mockTool.isPublic,
        author: mockTool.author,
        documentation: mockTool.documentation,
        icon: mockTool.icon,
        usageCount: mockTool.usageCount,
        successRate: mockTool.successRate,
        averageResponseTime: mockTool.averageResponseTime,
        lastUsedAt: mockTool.lastUsedAt,
        lastErrorAt: mockTool.lastErrorAt,
        lastErrorMessage: mockTool.lastErrorMessage,
        rateLimit: mockTool.rateLimit,
        rateLimitWindow: mockTool.rateLimitWindow,
        enabled: mockTool.enabled,
        environment: mockTool.environment,
        region: mockTool.region,
        permissions: mockTool.permissions,
        webhookSecret: mockTool.webhookSecret,
        validateWebhook: mockTool.validateWebhook,
        webhookEndpoint: mockTool.webhookEndpoint,
        webhookMethod: mockTool.webhookMethod,
        webhookHeaders: mockTool.webhookHeaders,
        createdAt: mockTool.createdAt,
        updatedAt: mockTool.updatedAt,
      });
    });
  });

  describe('findById', () => {
    it('should return a tool by id', async () => {
      repository.findById.mockResolvedValue(mockTool);

      const result = await service.findById('tool_1');

      expect(repository.findById).toHaveBeenCalledWith('tool_1');
      expect(result.id).toBe('tool_1');
    });

    it('should throw NotFoundException when tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Tool with ID nonexistent not found',
      );
    });
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

      const createdTool = {
        ...mockTool,
        id: 'tool_new',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.create.mockResolvedValue(createdTool);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          orgId: 'default-org',
          name: createDto.name,
          description: createDto.description,
          type: createDto.type,
          version: createDto.version,
          category: createDto.category,
          tags: createDto.tags,
          enabled: createDto.enabled,
          status: ToolStatus.ACTIVE,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
      expect(result.id).toBe('tool_new');
    });
  });

  describe('update', () => {
    it('should update a tool', async () => {
      const updateDto: UpdateToolDto = {
        description: 'Updated description',
        version: '2.0.0',
      };

      const updatedTool = {
        ...mockTool,
        description: 'Updated description',
        version: '2.0.0',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.findById.mockResolvedValue(mockTool);
      repository.update.mockResolvedValue(updatedTool);

      const result = await service.update('tool_1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('tool_1');
      expect(repository.update).toHaveBeenCalledWith('tool_1', {
        ...updateDto,
        updatedAt: expect.any(String),
      });
      expect(result.description).toBe('Updated description');
      expect(result.version).toBe('2.0.0');
    });

    it('should throw NotFoundException when tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a tool', async () => {
      repository.findById.mockResolvedValue(mockTool);
      repository.delete.mockResolvedValue(undefined);

      await service.delete('tool_1');

      expect(repository.findById).toHaveBeenCalledWith('tool_1');
      expect(repository.delete).toHaveBeenCalledWith('tool_1');
    });

    it('should throw NotFoundException when tool not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
