import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AnalyticsService } from '../../application/services/analytics.service';
import { CreateAnalyticsRequestDto } from '../../application/dtos/create-analytics-request.dto';
import { AnalyticsResultDto } from '../../application/dtos/analytics-result.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create analytics queries to retrieve data insights',
    description: 'Execute analytics queries against various tables (calls, assistants, campaigns, etc.) with customizable operations and filters'
  })
  @ApiBody({
    type: CreateAnalyticsRequestDto,
    description: 'Analytics queries to execute',
    examples: {
      callDurationSummary: {
        summary: 'Call Duration Summary',
        description: 'Get total call duration by assistant',
        value: {
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
        }
      },
      assistantPerformance: {
        summary: 'Assistant Performance',
        description: 'Analyze assistant performance metrics',
        value: {
          queries: [
            {
              table: 'assistant',
              name: 'assistant-performance',
              operations: [
                { operation: 'avg', column: 'successRate' },
                { operation: 'max', column: 'totalCalls' }
              ],
              filters: { status: 'active' },
              groupBy: ['assistantId']
            }
          ]
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Analytics queries executed successfully',
    type: [AnalyticsResultDto],
    example: [
      {
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
          },
          {
            date: '2024-01-02',
            assistantId: 'assistant_456',
            endedReason: 'assistant-ended-call',
            sumDuration: 800,
            countId: 3
          }
        ]
      }
    ]
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid query parameters'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid API key'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async createAnalytics(
    @Body() request: CreateAnalyticsRequestDto,
  ): Promise<AnalyticsResultDto[]> {
    return this.analyticsService.createAnalytics(request);
  }
}