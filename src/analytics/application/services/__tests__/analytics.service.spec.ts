import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../analytics.service';
import { AnalyticsRepository } from '../../../infrastructure/repositories/analytics.repository';
import { CreateAnalyticsRequestDto } from '../../dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../../dtos/analytics-result.dto';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let repository: jest.Mocked<AnalyticsRepository>;

  const mockAnalyticsResult: AnalyticsResultDto = {
    name: 'call-duration-summary',
    timeRange: {
      step: 'day',
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
      timezone: 'UTC'
    },
    result: [
      {
        date: '2024-01-01',
        assistantId: 'assistant_123',
        endedReason: 'customer-ended-call',
        sumDuration: 1200,
        countId: 5
      }
    ]
  };

  const mockRepository = {
    createAnalytics: jest.fn(),
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

  describe('createAnalytics', () => {
    it('should create analytics queries and return results', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'call',
            name: 'call-duration-summary',
            operations: [
              { operation: 'sum', column: 'duration' },
              { operation: 'count', column: 'id' }
            ],
            groupBy: ['assistantId', 'endedReason'],
            timeRange: {
              start: '2024-01-01T00:00:00Z',
              end: '2024-01-31T23:59:59Z',
              step: 'day',
              timezone: 'UTC'
            }
          }
        ]
      };

      repository.createAnalytics.mockResolvedValue([mockAnalyticsResult]);

      const result = await service.createAnalytics(request);

      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
      expect(repository.createAnalytics).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockAnalyticsResult]);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('call-duration-summary');
    });

    it('should handle multiple analytics queries', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'call',
            name: 'call-duration-summary',
            operations: [
              { operation: 'sum', column: 'duration' }
            ]
          },
          {
            table: 'assistant',
            name: 'assistant-performance',
            operations: [
              { operation: 'avg', column: 'successRate' }
            ]
          }
        ]
      };

      const expectedResults: AnalyticsResultDto[] = [
        {
          name: 'call-duration-summary',
          timeRange: {
            step: 'day',
            start: '2024-01-01T00:00:00Z',
            end: '2024-01-31T23:59:59Z',
            timezone: 'UTC'
          },
          result: []
        },
        {
          name: 'assistant-performance',
          timeRange: {
            step: 'day',
            start: '2024-01-01T00:00:00Z',
            end: '2024-01-31T23:59:59Z',
            timezone: 'UTC'
          },
          result: []
        }
      ];

      repository.createAnalytics.mockResolvedValue(expectedResults);

      const result = await service.createAnalytics(request);

      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResults);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('call-duration-summary');
      expect(result[1].name).toBe('assistant-performance');
    });

    it('should handle empty results from repository', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'call',
            name: 'empty-analytics',
            operations: [
              { operation: 'count', column: 'id' }
            ],
            filters: { status: 'non-existent' }
          }
        ]
      };

      const expectedResult: AnalyticsResultDto = {
        name: 'empty-analytics',
        timeRange: {
          step: 'day',
          start: '2024-01-01T00:00:00Z',
          end: '2024-01-31T23:59:59Z',
          timezone: 'UTC'
        },
        result: []
      };

      repository.createAnalytics.mockResolvedValue([expectedResult]);

      const result = await service.createAnalytics(request);

      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
      expect(result).toEqual([expectedResult]);
      expect(result[0].result).toHaveLength(0);
    });

    it('should propagate repository errors', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'call',
            name: 'error-analytics',
            operations: [
              { operation: 'sum', column: 'duration' }
            ]
          }
        ]
      };

      const error = new Error('Analytics repository error');
      repository.createAnalytics.mockRejectedValue(error);

      await expect(service.createAnalytics(request)).rejects.toThrow(
        'Analytics repository error'
      );
      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
    });

    it('should handle complex analytics queries with filters', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'call',
            name: 'filtered-call-analytics',
            operations: [
              { operation: 'sum', column: 'duration' },
              { operation: 'avg', column: 'cost' }
            ],
            filters: {
              status: 'completed',
              assistantId: 'assistant_123'
            },
            groupBy: ['endedReason'],
            timeRange: {
              start: '2024-01-01T00:00:00Z',
              end: '2024-01-31T23:59:59Z',
              step: 'day',
              timezone: 'UTC'
            }
          }
        ]
      };

      const expectedResult: AnalyticsResultDto = {
        name: 'filtered-call-analytics',
        timeRange: {
          step: 'day',
          start: '2024-01-01T00:00:00Z',
          end: '2024-01-31T23:59:59Z',
          timezone: 'UTC'
        },
        result: [
          {
            endedReason: 'customer-ended-call',
            sumDuration: 1500,
            avgCost: 12.5
          }
        ]
      };

      repository.createAnalytics.mockResolvedValue([expectedResult]);

      const result = await service.createAnalytics(request);

      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
      expect(result).toEqual([expectedResult]);
      expect(result[0].name).toBe('filtered-call-analytics');
      expect(result[0].result).toHaveLength(1);
    });

    it('should handle different table types', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'session',
            name: 'session-analytics',
            operations: [
              { operation: 'count', column: 'id' },
              { operation: 'avg', column: 'duration' }
            ],
            groupBy: ['assistantId', 'status']
          }
        ]
      };

      const expectedResult: AnalyticsResultDto = {
        name: 'session-analytics',
        timeRange: {
          step: 'hour',
          start: '2024-01-01T00:00:00Z',
          end: '2024-01-31T23:59:59Z',
          timezone: 'UTC'
        },
        result: [
          {
            assistantId: 'assistant_123',
            status: 'completed',
            countId: 25,
            avgDuration: 180
          }
        ]
      };

      repository.createAnalytics.mockResolvedValue([expectedResult]);

      const result = await service.createAnalytics(request);

      expect(repository.createAnalytics).toHaveBeenCalledWith(request);
      expect(result[0].name).toBe('session-analytics');
      expect(result[0].result[0]).toHaveProperty('assistantId');
      expect(result[0].result[0]).toHaveProperty('status');
    });
  });
});
