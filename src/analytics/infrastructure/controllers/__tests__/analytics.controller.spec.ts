import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from '../analytics.controller';
import { AnalyticsService } from '../../../application/services/analytics.service';
import { CreateAnalyticsDto } from '../../../application/dtos/create-analytics.dto';
import { UpdateAnalyticsDto } from '../../../application/dtos/update-analytics.dto';
import { ListAnalyticsQueryDto } from '../../../application/dtos/list-analytics-query.dto';
import { AnalyticsResponseDto } from '../../../application/dtos/analytics-response.dto';
import { AnalyticsType, AnalyticsStatus, MetricsType, TimeRange } from '../../../domain/entities/analytics.entity';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: jest.Mocked<AnalyticsService>;

  const mockAnalyticsResponse: AnalyticsResponseDto = {
    id: 'analytics_1',
    orgId: 'org_1',
    name: 'Call Performance Report',
    description: 'Comprehensive analytics for call performance and metrics',
    type: AnalyticsType.CALL_ANALYTICS,
    status: AnalyticsStatus.ACTIVE,
    query: {
      filters: [
        {
          field: 'status',
          operator: 'eq',
          value: 'completed',
        },
      ],
      aggregations: [
        {
          field: 'duration',
          function: 'avg',
          alias: 'average_duration',
        },
        {
          field: 'cost',
          function: 'sum',
          alias: 'total_cost',
        },
      ],
      groupBy: ['assistant_id', 'date'],
      orderBy: ['date DESC'],
        timeRange: TimeRange.WEEK,
      limit: 1000,
    },
    metrics: [
      {
        name: 'total_calls',
        description: 'Total number of calls',
        type: MetricsType.COUNTER,
        value: 1250,
        unit: 'calls',
        labels: {
          status: 'completed',
          period: '1w',
        },
      },
      {
        name: 'average_duration',
        description: 'Average call duration',
        type: MetricsType.GAUGE,
        value: 180,
        unit: 'seconds',
        labels: {
          status: 'completed',
          period: '1w',
        },
      },
    ],
    configuration: {
      reportFormat: 'json',
      includeCharts: true,
      dataRetention: '90d',
    },
    metadata: {
      createdBy: 'admin',
      lastModifiedBy: 'admin',
      dataSource: 'call_logs',
    },
    format: 'json',
    schedule: '0 0 * * *', // Daily at midnight
    isScheduled: true,
    lastRunAt: '2024-01-15T00:00:00Z',
    nextRunAt: '2024-01-16T00:00:00Z',
    runCount: 15,
    successCount: 14,
    errorCount: 1,
    lastError: 'Database connection timeout',
    processingTime: 45000,
    recordCount: 1250,
    fileSize: '2.5MB',
    filePath: '/reports/call-performance-2024-01-15.json',
    downloadUrl: 'https://api.example.com/download/call-performance-2024-01-15.json',
    email: 'admin@example.com',
    emailNotification: true,
    webhookUrl: 'https://hooks.slack.com/services/webhook-url',
    webhookNotification: true,
    owner: 'admin',
    tags: ['calls', 'performance', 'weekly'],
    isPublic: false,
    category: 'performance',
    version: '1.0.0',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
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
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    service = module.get(AnalyticsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new analytics report', async () => {
      const createDto: CreateAnalyticsDto = {
        name: 'Test Analytics',
        description: 'A test analytics report for unit testing',
        type: AnalyticsType.CUSTOM,
        format: 'json',
        schedule: '0 0 * * *',
        isScheduled: true,
        email: 'test@example.com',
        emailNotification: true,
        owner: 'test_user',
        tags: ['test'],
        isPublic: false,
        category: 'test',
        version: '1.0.0',
      };

      service.create.mockResolvedValue(mockAnalyticsResponse);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('findAll', () => {
    it('should return all analytics reports', async () => {
      const query: ListAnalyticsQueryDto = { limit: 10 };
      service.findAll.mockResolvedValue([mockAnalyticsResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockAnalyticsResponse]);
    });

    it('should return filtered analytics reports', async () => {
      const query: ListAnalyticsQueryDto = {
        status: AnalyticsStatus.ACTIVE,
        type: AnalyticsType.CALL_ANALYTICS,
        limit: 5,
      };
      service.findAll.mockResolvedValue([mockAnalyticsResponse]);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual([mockAnalyticsResponse]);
    });
  });

  describe('findOne', () => {
    it('should return an analytics report by id', async () => {
      service.findById.mockResolvedValue(mockAnalyticsResponse);

      const result = await controller.findOne('analytics_1');

      expect(service.findById).toHaveBeenCalledWith('analytics_1');
      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('update', () => {
    it('should update an analytics report', async () => {
      const updateDto: UpdateAnalyticsDto = {
        description: 'Updated description',
        version: '2.0.0',
      };

      const updatedResponse = {
        ...mockAnalyticsResponse,
        description: 'Updated description',
        version: '2.0.0',
      };

      service.update.mockResolvedValue(updatedResponse);

      const result = await controller.update('analytics_1', updateDto);

      expect(service.update).toHaveBeenCalledWith('analytics_1', updateDto);
      expect(result).toEqual(updatedResponse);
    });
  });

  describe('remove', () => {
    it('should delete an analytics report', async () => {
      service.delete.mockResolvedValue(undefined);

      await controller.remove('analytics_1');

      expect(service.delete).toHaveBeenCalledWith('analytics_1');
    });
  });
});
