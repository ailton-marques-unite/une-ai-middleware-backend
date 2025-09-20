import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from '../analytics.controller';
import { AnalyticsService } from '../../../application/services/analytics.service';
import { CreateAnalyticsRequestDto } from '../../../application/dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../../../application/dtos/analytics-result.dto';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: jest.Mocked<AnalyticsService>;

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

  beforeEach(async () => {
    const mockService = {
      createAnalytics: jest.fn(),
    };

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

  describe('createAnalytics', () => {
    it('should create analytics queries for call duration summary', async () => {
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

      service.createAnalytics.mockResolvedValue([mockAnalyticsResult]);

      const result = await controller.createAnalytics(request);

      expect(service.createAnalytics).toHaveBeenCalledWith(request);
      expect(service.createAnalytics).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockAnalyticsResult]);
      expect(result[0].name).toBe('call-duration-summary');
    });

    it('should handle service errors during analytics creation', async () => {
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

      const error = new Error('Analytics service unavailable');
      service.createAnalytics.mockRejectedValue(error);

      await expect(controller.createAnalytics(request)).rejects.toThrow(
        'Analytics service unavailable'
      );
      expect(service.createAnalytics).toHaveBeenCalledWith(request);
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

      service.createAnalytics.mockResolvedValue(expectedResults);

      const result = await controller.createAnalytics(request);

      expect(service.createAnalytics).toHaveBeenCalledWith(request);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('call-duration-summary');
      expect(result[1].name).toBe('assistant-performance');
    });

    it('should handle empty results', async () => {
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

      service.createAnalytics.mockResolvedValue([expectedResult]);

      const result = await controller.createAnalytics(request);

      expect(service.createAnalytics).toHaveBeenCalledWith(request);
      expect(result[0].result).toHaveLength(0);
    });

    it('should handle invalid query parameters', async () => {
      const request: CreateAnalyticsRequestDto = {
        queries: [
          {
            table: 'invalid-table',
            name: 'invalid-analytics',
            operations: [
              { operation: 'invalid-operation', column: 'invalid-column' }
            ]
          }
        ]
      };

      const error = new Error('Invalid table or operation');
      service.createAnalytics.mockRejectedValue(error);

      await expect(controller.createAnalytics(request)).rejects.toThrow(
        'Invalid table or operation'
      );
      expect(service.createAnalytics).toHaveBeenCalledWith(request);
    });
  });
});
