import { Test, TestingModule } from '@nestjs/testing';
import { ToolController } from '../tool.controller';
import { ToolService } from '../../../application/services/tool.service';
import { ListToolsQueryDto } from '../../../application/dtos/list-tools-query.dto';
import { ToolResponseDto } from '../../../application/dtos/tool-response.dto';
import {
  ToolType,
  ToolStatus,
  HttpMethod,
} from '../../../domain/entities/tool.entity';

describe('ToolController', () => {
  let controller: ToolController;
  let service: jest.Mocked<ToolService>;

  const mockToolResponse: ToolResponseDto = {
    id: 'tool_1',
    orgId: 'org-1',
    name: 'Weather API Tool',
    description: 'Get current weather information',
    type: ToolType.FUNCTION,
    status: ToolStatus.ACTIVE,
    function: {
      name: 'get_weather',
      description: 'Get weather for a location',
      parameters: [
        {
          name: 'location',
          type: 'string',
          description: 'City name or coordinates',
          required: true,
        },
      ],
    },
    version: '1.0.0',
    category: 'weather',
    tags: ['api', 'weather', 'location'],
    isPublic: true,
    author: 'john.doe@example.com',
    usageCount: 150,
    successRate: 95.5,
    averageResponseTime: 250,
    enabled: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
    };

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

  describe('findAll', () => {
    it('should return all tools without filters', async () => {
      const query: ListToolsQueryDto = {};
      const expectedTools = [mockToolResponse];

      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedTools);
      expect(result).toHaveLength(1);
    });

    it('should return tools filtered by status', async () => {
      const query: ListToolsQueryDto = {
        status: ToolStatus.ACTIVE,
        limit: 50,
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].status).toBe(ToolStatus.ACTIVE);
    });

    it('should return tools filtered by type', async () => {
      const query: ListToolsQueryDto = {
        type: ToolType.FUNCTION,
        limit: 25,
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].type).toBe(ToolType.FUNCTION);
    });

    it('should return tools filtered by multiple criteria', async () => {
      const query: ListToolsQueryDto = {
        status: ToolStatus.ACTIVE,
        type: ToolType.FUNCTION,
        category: 'weather',
        isPublic: true,
        enabled: true,
        limit: 10,
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].category).toBe('weather');
      expect(result[0].isPublic).toBe(true);
      expect(result[0].enabled).toBe(true);
    });

    it('should return tools filtered by date range', async () => {
      const query: ListToolsQueryDto = {
        createdAtGt: '2024-01-01T00:00:00Z',
        createdAtLe: '2024-12-31T23:59:59Z',
        updatedAtGe: '2024-01-01T00:00:00Z',
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
    });

    it('should return tools filtered by usage statistics', async () => {
      const query: ListToolsQueryDto = {
        minUsageCount: 100,
        maxUsageCount: 500,
        minSuccessRate: 90,
        maxSuccessRate: 100,
        minAverageResponseTime: 100,
        maxAverageResponseTime: 1000,
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].usageCount).toBeGreaterThanOrEqual(100);
      expect(result[0].successRate).toBeGreaterThanOrEqual(90);
    });

    it('should return tools filtered by author and tags', async () => {
      const query: ListToolsQueryDto = {
        author: 'john.doe@example.com',
        tag: 'api',
        name: 'Weather',
        description: 'weather information',
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].author).toBe('john.doe@example.com');
      expect(result[0].tags).toContain('api');
    });

    it('should return tools filtered by environment and region', async () => {
      const query: ListToolsQueryDto = {
        environment: 'production',
        region: 'us-east-1',
        version: '1.0.0',
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
      expect(result[0].version).toBe('1.0.0');
    });

    it('should return empty array when no tools match criteria', async () => {
      const query: ListToolsQueryDto = {
        status: ToolStatus.INACTIVE,
        category: 'non-existent',
      };

      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle service errors during tool retrieval', async () => {
      const query: ListToolsQueryDto = {};

      const error = new Error('Tool service unavailable');
      service.findAll.mockRejectedValue(error);

      await expect(controller.findAll(query)).rejects.toThrow(
        'Tool service unavailable',
      );
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should handle multiple tools with different types', async () => {
      const query: ListToolsQueryDto = {};

      const expectedTools: ToolResponseDto[] = [
        {
          ...mockToolResponse,
          id: 'tool_1',
          type: ToolType.FUNCTION,
          name: 'Weather Tool',
        },
        {
          ...mockToolResponse,
          id: 'tool_2',
          type: ToolType.WEBHOOK,
          name: 'Payment Webhook',
          webhook: {
            url: 'https://api.example.com/webhook',
            method: HttpMethod.POST,
            headers: { 'Content-Type': 'application/json' },
          },
        },
        {
          ...mockToolResponse,
          id: 'tool_3',
          type: ToolType.API,
          name: 'Database API',
          endpoint: {
            url: 'https://api.example.com/db',
            method: HttpMethod.GET,
            headers: { Authorization: 'Bearer token' },
          },
        },
      ];

      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe(ToolType.FUNCTION);
      expect(result[1].type).toBe(ToolType.WEBHOOK);
      expect(result[2].type).toBe(ToolType.API);
    });

    it('should handle complex query with all possible filters', async () => {
      const query: ListToolsQueryDto = {
        limit: 5,
        status: ToolStatus.ACTIVE,
        type: ToolType.FUNCTION,
        category: 'productivity',
        author: 'team@example.com',
        name: 'automation',
        description: 'task',
        version: '2.0',
        environment: 'production',
        region: 'us-west-2',
        isPublic: true,
        enabled: true,
        tag: 'ai',
        minUsageCount: 50,
        maxUsageCount: 1000,
        minSuccessRate: 85,
        maxSuccessRate: 99.9,
        minAverageResponseTime: 50,
        maxAverageResponseTime: 500,
        createdAtGt: '2024-01-01T00:00:00Z',
        createdAtLt: '2024-12-31T23:59:59Z',
        createdAtGe: '2024-01-01T00:00:00Z',
        createdAtLe: '2024-12-31T23:59:59Z',
        updatedAtGt: '2024-01-01T00:00:00Z',
        updatedAtLt: '2024-12-31T23:59:59Z',
        updatedAtGe: '2024-01-01T00:00:00Z',
        updatedAtLe: '2024-12-31T23:59:59Z',
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
    });

    it('should handle limit validation', async () => {
      const query: ListToolsQueryDto = {
        limit: 1000, // Max limit
      };

      const expectedTools = [mockToolResponse];
      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedTools);
    });

    it('should handle tools with different statuses', async () => {
      const query: ListToolsQueryDto = {};

      const expectedTools: ToolResponseDto[] = [
        {
          ...mockToolResponse,
          id: 'tool_active',
          status: ToolStatus.ACTIVE,
        },
        {
          ...mockToolResponse,
          id: 'tool_pending',
          status: ToolStatus.PENDING,
        },
        {
          ...mockToolResponse,
          id: 'tool_error',
          status: ToolStatus.ERROR,
          lastErrorAt: '2024-01-15T10:30:00Z',
          lastErrorMessage: 'Connection timeout',
        },
      ];

      service.findAll.mockResolvedValue(expectedTools);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(3);
      expect(result[0].status).toBe(ToolStatus.ACTIVE);
      expect(result[1].status).toBe(ToolStatus.PENDING);
      expect(result[2].status).toBe(ToolStatus.ERROR);
    });
  });
});
