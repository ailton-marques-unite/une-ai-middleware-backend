import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsRepository } from '../../../infrastructure/repositories/analytics.repository';
import { CreateAnalyticsDto } from '../../dtos/create-analytics.dto';
import { UpdateAnalyticsDto } from '../../dtos/update-analytics.dto';
import { ListAnalyticsQueryDto } from '../../dtos/list-analytics-query.dto';
import { Analytics, AnalyticsStatus, AnalyticsType, MetricsType, TimeRange } from '../../../domain/entities/analytics.entity';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let repository: jest.Mocked<AnalyticsRepository>;

  const mockAnalytics: Analytics = {
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
        AnalyticsService,
        {
          provide: AnalyticsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    repository = module.get(AnalyticsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all analytics', async () => {
      const query: ListAnalyticsQueryDto = { limit: 10 };
      repository.findAll.mockResolvedValue([mockAnalytics]);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: mockAnalytics.id,
        orgId: mockAnalytics.orgId,
        name: mockAnalytics.name,
        description: mockAnalytics.description,
        type: mockAnalytics.type,
        status: mockAnalytics.status,
        query: mockAnalytics.query,
        metrics: mockAnalytics.metrics,
        dimensions: mockAnalytics.dimensions,
        configuration: mockAnalytics.configuration,
        metadata: mockAnalytics.metadata,
        format: mockAnalytics.format,
        schedule: mockAnalytics.schedule,
        isScheduled: mockAnalytics.isScheduled,
        lastRunAt: mockAnalytics.lastRunAt,
        nextRunAt: mockAnalytics.nextRunAt,
        runCount: mockAnalytics.runCount,
        successCount: mockAnalytics.successCount,
        errorCount: mockAnalytics.errorCount,
        lastError: mockAnalytics.lastError,
        processingTime: mockAnalytics.processingTime,
        recordCount: mockAnalytics.recordCount,
        fileSize: mockAnalytics.fileSize,
        filePath: mockAnalytics.filePath,
        downloadUrl: mockAnalytics.downloadUrl,
        email: mockAnalytics.email,
        emailNotification: mockAnalytics.emailNotification,
        webhookUrl: mockAnalytics.webhookUrl,
        webhookNotification: mockAnalytics.webhookNotification,
        owner: mockAnalytics.owner,
        tags: mockAnalytics.tags,
        isPublic: mockAnalytics.isPublic,
        category: mockAnalytics.category,
        version: mockAnalytics.version,
        createdAt: mockAnalytics.createdAt,
        updatedAt: mockAnalytics.updatedAt,
      });
    });
  });

  describe('findById', () => {
    it('should return analytics by id', async () => {
      repository.findById.mockResolvedValue(mockAnalytics);

      const result = await service.findById('analytics_1');

      expect(repository.findById).toHaveBeenCalledWith('analytics_1');
      expect(result.id).toBe('analytics_1');
    });

    it('should throw NotFoundException when analytics not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findById('nonexistent')).rejects.toThrow(
        'Analytics with ID nonexistent not found',
      );
    });
  });

  describe('create', () => {
    it('should create new analytics', async () => {
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

      const createdAnalytics = {
        ...mockAnalytics,
        id: 'analytics_new',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.create.mockResolvedValue(createdAnalytics);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          orgId: 'default-org',
          name: createDto.name,
          description: createDto.description,
          type: createDto.type,
          format: createDto.format,
          schedule: createDto.schedule,
          isScheduled: createDto.isScheduled,
          email: createDto.email,
          emailNotification: createDto.emailNotification,
          owner: createDto.owner,
          tags: createDto.tags,
          isPublic: createDto.isPublic,
          category: createDto.category,
          version: createDto.version,
          status: AnalyticsStatus.ACTIVE,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
      expect(result.id).toBe('analytics_new');
    });
  });

  describe('update', () => {
    it('should update analytics', async () => {
      const updateDto: UpdateAnalyticsDto = {
        description: 'Updated description',
        version: '2.0.0',
      };

      const updatedAnalytics = {
        ...mockAnalytics,
        description: 'Updated description',
        version: '2.0.0',
        updatedAt: '2024-01-02T00:00:00Z',
      };

      repository.findById.mockResolvedValue(mockAnalytics);
      repository.update.mockResolvedValue(updatedAnalytics);

      const result = await service.update('analytics_1', updateDto);

      expect(repository.findById).toHaveBeenCalledWith('analytics_1');
      expect(repository.update).toHaveBeenCalledWith('analytics_1', {
        ...updateDto,
        updatedAt: expect.any(String),
      });
      expect(result.description).toBe('Updated description');
      expect(result.version).toBe('2.0.0');
    });

    it('should throw NotFoundException when analytics not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete analytics', async () => {
      repository.findById.mockResolvedValue(mockAnalytics);
      repository.delete.mockResolvedValue(undefined);

      await service.delete('analytics_1');

      expect(repository.findById).toHaveBeenCalledWith('analytics_1');
      expect(repository.delete).toHaveBeenCalledWith('analytics_1');
    });

    it('should throw NotFoundException when analytics not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
