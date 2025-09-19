import { Injectable } from '@nestjs/common';
import { AnalyticsRepositoryInterface } from '../../domain/repositories/analytics.repository.interface';
import { Analytics, AnalyticsStatus, AnalyticsType, MetricsType, TimeRange } from '../../domain/entities/analytics.entity';

@Injectable()
export class AnalyticsRepository implements AnalyticsRepositoryInterface {
  private analytics: Analytics[] = [
    {
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
        {
          name: 'success_rate',
          description: 'Call success rate percentage',
          type: MetricsType.GAUGE,
          value: 95.5,
          unit: 'percentage',
          labels: {
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
    },
    {
      id: 'analytics_2',
      orgId: 'org_1',
      name: 'Assistant Usage Analytics',
      description: 'Track assistant usage patterns and performance',
      type: AnalyticsType.ASSISTANT_ANALYTICS,
      status: AnalyticsStatus.ACTIVE,
      query: {
        filters: [
          {
            field: 'assistant_id',
            operator: 'ne',
            value: null,
          },
        ],
        aggregations: [
          {
            field: 'usage_count',
            function: 'sum',
            alias: 'total_usage',
          },
          {
            field: 'response_time',
            function: 'avg',
            alias: 'avg_response_time',
          },
        ],
        groupBy: ['assistant_id', 'date'],
        orderBy: ['total_usage DESC'],
        timeRange: TimeRange.MONTH,
        limit: 500,
      },
      metrics: [
        {
          name: 'total_assistants',
          description: 'Total number of active assistants',
          type: MetricsType.COUNTER,
          value: 25,
          unit: 'assistants',
          labels: {
            status: 'active',
          },
        },
        {
          name: 'most_used_assistant',
          description: 'Most frequently used assistant',
          type: MetricsType.GAUGE,
          value: 1,
          unit: 'assistant_id',
          labels: {
            assistant_id: 'asst_123',
            usage_count: '450',
          },
        },
      ],
      configuration: {
        reportFormat: 'csv',
        includeCharts: false,
        dataRetention: '180d',
      },
      metadata: {
        createdBy: 'analyst',
        lastModifiedBy: 'analyst',
        dataSource: 'assistant_logs',
      },
      format: 'csv',
      schedule: '0 6 * * 1', // Weekly on Monday at 6 AM
      isScheduled: true,
      lastRunAt: '2024-01-15T06:00:00Z',
      nextRunAt: '2024-01-22T06:00:00Z',
      runCount: 3,
      successCount: 3,
      errorCount: 0,
      processingTime: 12000,
      recordCount: 500,
      fileSize: '1.2MB',
      filePath: '/reports/assistant-usage-2024-01-15.csv',
      downloadUrl: 'https://api.example.com/download/assistant-usage-2024-01-15.csv',
      email: 'analyst@example.com',
      emailNotification: true,
      owner: 'analyst',
      tags: ['assistants', 'usage', 'monthly'],
      isPublic: false,
      category: 'usage',
      version: '1.1.0',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-15T06:00:00Z',
    },
    {
      id: 'analytics_3',
      orgId: 'org_1',
      name: 'Campaign ROI Analysis',
      description: 'Return on investment analysis for marketing campaigns',
      type: AnalyticsType.CAMPAIGN_ANALYTICS,
      status: AnalyticsStatus.PROCESSING,
      query: {
        filters: [
          {
            field: 'campaign_status',
            operator: 'eq',
            value: 'completed',
          },
        ],
        aggregations: [
          {
            field: 'cost',
            function: 'sum',
            alias: 'total_cost',
          },
          {
            field: 'revenue',
            function: 'sum',
            alias: 'total_revenue',
          },
        ],
        groupBy: ['campaign_id', 'date'],
        orderBy: ['roi DESC'],
        timeRange: TimeRange.QUARTER,
        limit: 100,
      },
      metrics: [
        {
          name: 'total_campaigns',
          description: 'Total number of completed campaigns',
          type: MetricsType.COUNTER,
          value: 15,
          unit: 'campaigns',
          labels: {
            status: 'completed',
          },
        },
        {
          name: 'average_roi',
          description: 'Average return on investment',
          type: MetricsType.GAUGE,
          value: 245.5,
          unit: 'percentage',
          labels: {
            period: '1Q',
          },
        },
      ],
      configuration: {
        reportFormat: 'pdf',
        includeCharts: true,
        dataRetention: '1Y',
      },
      metadata: {
        createdBy: 'marketing',
        lastModifiedBy: 'marketing',
        dataSource: 'campaign_logs',
      },
      format: 'pdf',
      schedule: '0 0 1 * *', // Monthly on the 1st
      isScheduled: true,
      lastRunAt: '2024-01-15T10:30:00Z',
      nextRunAt: '2024-02-01T00:00:00Z',
      runCount: 1,
      successCount: 0,
      errorCount: 0,
      processingTime: 0,
      recordCount: 0,
      email: 'marketing@example.com',
      emailNotification: true,
      owner: 'marketing',
      tags: ['campaigns', 'roi', 'quarterly'],
      isPublic: false,
      category: 'financial',
      version: '2.0.0',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
  ];

  async findAll(query?: any): Promise<Analytics[]> {
    let filteredAnalytics = [...this.analytics];

    if (query) {
      if (query.status) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.status === query.status
        );
      }

      if (query.type) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.type === query.type
        );
      }

      if (query.category) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.category === query.category
        );
      }

      if (query.owner) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.owner === query.owner
        );
      }

      if (query.name) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.name.toLowerCase().includes(query.name.toLowerCase())
        );
      }

      if (query.description) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.description.toLowerCase().includes(query.description.toLowerCase())
        );
      }

      if (query.version) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.version === query.version
        );
      }

      if (query.format) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.format === query.format
        );
      }

      if (query.schedule) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.schedule === query.schedule
        );
      }

      if (query.isPublic !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.isPublic === query.isPublic
        );
      }

      if (query.isScheduled !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.isScheduled === query.isScheduled
        );
      }

      if (query.emailNotification !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.emailNotification === query.emailNotification
        );
      }

      if (query.webhookNotification !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.webhookNotification === query.webhookNotification
        );
      }

      if (query.tag) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => analytics.tags?.includes(query.tag)
        );
      }

      // Numeric range filters
      if (query.minRunCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.runCount || 0) >= query.minRunCount
        );
      }

      if (query.maxRunCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.runCount || 0) <= query.maxRunCount
        );
      }

      if (query.minSuccessCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.successCount || 0) >= query.minSuccessCount
        );
      }

      if (query.maxSuccessCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.successCount || 0) <= query.maxSuccessCount
        );
      }

      if (query.minErrorCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.errorCount || 0) >= query.minErrorCount
        );
      }

      if (query.maxErrorCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.errorCount || 0) <= query.maxErrorCount
        );
      }

      if (query.minProcessingTime !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.processingTime || 0) >= query.minProcessingTime
        );
      }

      if (query.maxProcessingTime !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.processingTime || 0) <= query.maxProcessingTime
        );
      }

      if (query.minRecordCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.recordCount || 0) >= query.minRecordCount
        );
      }

      if (query.maxRecordCount !== undefined) {
        filteredAnalytics = filteredAnalytics.filter(
          analytics => (analytics.recordCount || 0) <= query.maxRecordCount
        );
      }

      // Date filtering
      if (query.createdAtGt) {
        const date = new Date(query.createdAtGt);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.createdAt) > date
        );
      }

      if (query.createdAtLt) {
        const date = new Date(query.createdAtLt);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.createdAt) < date
        );
      }

      if (query.createdAtGe) {
        const date = new Date(query.createdAtGe);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.createdAt) >= date
        );
      }

      if (query.createdAtLe) {
        const date = new Date(query.createdAtLe);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.createdAt) <= date
        );
      }

      if (query.updatedAtGt) {
        const date = new Date(query.updatedAtGt);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.updatedAt) > date
        );
      }

      if (query.updatedAtLt) {
        const date = new Date(query.updatedAtLt);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.updatedAt) < date
        );
      }

      if (query.updatedAtGe) {
        const date = new Date(query.updatedAtGe);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.updatedAt) >= date
        );
      }

      if (query.updatedAtLe) {
        const date = new Date(query.updatedAtLe);
        filteredAnalytics = filteredAnalytics.filter(
          analytics => new Date(analytics.updatedAt) <= date
        );
      }

      // Pagination
      if (query.limit) {
        filteredAnalytics = filteredAnalytics.slice(0, query.limit);
      }
    }

    return filteredAnalytics;
  }

  async findById(id: string): Promise<Analytics | null> {
    return this.analytics.find(analytics => analytics.id === id) || null;
  }

  async create(analytics: Analytics): Promise<Analytics> {
    this.analytics.push(analytics);
    return analytics;
  }

  async update(id: string, analytics: Partial<Analytics>): Promise<Analytics> {
    const index = this.analytics.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Analytics with ID ${id} not found`);
    }

    this.analytics[index] = { ...this.analytics[index], ...analytics };
    return this.analytics[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.analytics.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Analytics with ID ${id} not found`);
    }

    this.analytics.splice(index, 1);
  }
}
