import { Injectable } from '@nestjs/common';
import { ToolRepositoryInterface } from '../../domain/repositories/tool.repository.interface';
import { Tool, ToolStatus, ToolType, HttpMethod } from '../../domain/entities/tool.entity';

@Injectable()
export class ToolRepository implements ToolRepositoryInterface {
  private tools: Tool[] = [
    {
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
    },
    {
      id: 'tool_2',
      orgId: 'org_1',
      name: 'Email Sender',
      description: 'Send emails via SMTP',
      type: ToolType.EMAIL,
      status: ToolStatus.ACTIVE,
      function: {
        name: 'sendEmail',
        description: 'Send an email to specified recipients',
        parameters: [
          {
            name: 'to',
            type: 'string',
            description: 'Email recipient',
            required: true,
            schema: {
              type: 'string',
              format: 'email',
            },
          },
          {
            name: 'subject',
            type: 'string',
            description: 'Email subject',
            required: true,
          },
          {
            name: 'body',
            type: 'string',
            description: 'Email body content',
            required: true,
          },
        ],
        implementation: 'email-sender-function.js',
        language: 'javascript',
        runtime: {
          nodeVersion: '18.x',
          timeout: 30000,
        },
      },
      webhook: {
        url: 'https://api.example.com/webhooks/email-status',
        method: HttpMethod.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        secret: 'webhook-secret-123',
        verifySignature: true,
        events: ['email.sent', 'email.failed'],
      },
      version: '2.1.0',
      category: 'communication',
      tags: ['email', 'smtp', 'notification'],
      configuration: {
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        useTLS: true,
      },
      metadata: {
        provider: 'SMTP',
        maxRecipients: 100,
      },
      isPublic: false,
      author: 'admin',
      documentation: 'Send emails using SMTP configuration',
      icon: 'email-icon.png',
      usageCount: 3420,
      successRate: 99.2,
      averageResponseTime: 1500,
      lastUsedAt: '2024-01-15T09:45:00Z',
      enabled: true,
      environment: 'production',
      region: 'us-west-2',
      permissions: ['write'],
      webhookSecret: 'webhook-secret-123',
      validateWebhook: true,
      webhookEndpoint: 'https://api.example.com/webhooks/email-status',
      webhookMethod: 'POST',
      webhookHeaders: {
        'Content-Type': 'application/json',
      },
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-15T09:45:00Z',
    },
    {
      id: 'tool_3',
      orgId: 'org_1',
      name: 'Database Query Tool',
      description: 'Execute SQL queries on configured database',
      type: ToolType.DATABASE,
      status: ToolStatus.ACTIVE,
      function: {
        name: 'executeQuery',
        description: 'Execute a SQL query and return results',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'SQL query to execute',
            required: true,
            schema: {
              type: 'string',
              minLength: 1,
            },
          },
          {
            name: 'limit',
            type: 'number',
            description: 'Maximum number of rows to return',
            required: false,
            defaultValue: '100',
            schema: {
              type: 'number',
              minimum: 1,
              maximum: 10000,
            },
          },
        ],
        implementation: 'database-query-function.js',
        language: 'javascript',
        runtime: {
          nodeVersion: '18.x',
          timeout: 60000,
        },
      },
      authentication: {
        type: 'database',
        username: 'db_user',
        password: 'db_password',
      },
      version: '1.5.0',
      category: 'database',
      tags: ['sql', 'database', 'query'],
      configuration: {
        host: 'localhost',
        port: 5432,
        database: 'production_db',
        ssl: true,
      },
      metadata: {
        provider: 'PostgreSQL',
        maxQueryTime: 60,
      },
      isPublic: false,
      author: 'dba',
      documentation: 'Execute SQL queries on PostgreSQL database',
      icon: 'database-icon.png',
      usageCount: 890,
      successRate: 95.8,
      averageResponseTime: 800,
      lastUsedAt: '2024-01-15T08:20:00Z',
      lastErrorAt: '2024-01-14T15:30:00Z',
      lastErrorMessage: 'Connection timeout',
      enabled: true,
      environment: 'production',
      region: 'us-east-1',
      permissions: ['read', 'write'],
      rateLimit: 100,
      rateLimitWindow: 3600,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-15T08:20:00Z',
    },
  ];

  async findAll(query?: any): Promise<Tool[]> {
    let filteredTools = [...this.tools];

    if (query) {
      if (query.status) {
        filteredTools = filteredTools.filter(
          tool => tool.status === query.status
        );
      }

      if (query.type) {
        filteredTools = filteredTools.filter(
          tool => tool.type === query.type
        );
      }

      if (query.category) {
        filteredTools = filteredTools.filter(
          tool => tool.category === query.category
        );
      }

      if (query.author) {
        filteredTools = filteredTools.filter(
          tool => tool.author === query.author
        );
      }

      if (query.name) {
        filteredTools = filteredTools.filter(
          tool => tool.name.toLowerCase().includes(query.name.toLowerCase())
        );
      }

      if (query.description) {
        filteredTools = filteredTools.filter(
          tool => tool.description.toLowerCase().includes(query.description.toLowerCase())
        );
      }

      if (query.version) {
        filteredTools = filteredTools.filter(
          tool => tool.version === query.version
        );
      }

      if (query.environment) {
        filteredTools = filteredTools.filter(
          tool => tool.environment === query.environment
        );
      }

      if (query.region) {
        filteredTools = filteredTools.filter(
          tool => tool.region === query.region
        );
      }

      if (query.isPublic !== undefined) {
        filteredTools = filteredTools.filter(
          tool => tool.isPublic === query.isPublic
        );
      }

      if (query.enabled !== undefined) {
        filteredTools = filteredTools.filter(
          tool => tool.enabled === query.enabled
        );
      }

      if (query.tag) {
        filteredTools = filteredTools.filter(
          tool => tool.tags?.includes(query.tag)
        );
      }

      if (query.minUsageCount !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.usageCount || 0) >= query.minUsageCount
        );
      }

      if (query.maxUsageCount !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.usageCount || 0) <= query.maxUsageCount
        );
      }

      if (query.minSuccessRate !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.successRate || 0) >= query.minSuccessRate
        );
      }

      if (query.maxSuccessRate !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.successRate || 0) <= query.maxSuccessRate
        );
      }

      if (query.minAverageResponseTime !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.averageResponseTime || 0) >= query.minAverageResponseTime
        );
      }

      if (query.maxAverageResponseTime !== undefined) {
        filteredTools = filteredTools.filter(
          tool => (tool.averageResponseTime || 0) <= query.maxAverageResponseTime
        );
      }

      // Date filtering
      if (query.createdAtGt) {
        const date = new Date(query.createdAtGt);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.createdAt) > date
        );
      }

      if (query.createdAtLt) {
        const date = new Date(query.createdAtLt);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.createdAt) < date
        );
      }

      if (query.createdAtGe) {
        const date = new Date(query.createdAtGe);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.createdAt) >= date
        );
      }

      if (query.createdAtLe) {
        const date = new Date(query.createdAtLe);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.createdAt) <= date
        );
      }

      if (query.updatedAtGt) {
        const date = new Date(query.updatedAtGt);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.updatedAt) > date
        );
      }

      if (query.updatedAtLt) {
        const date = new Date(query.updatedAtLt);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.updatedAt) < date
        );
      }

      if (query.updatedAtGe) {
        const date = new Date(query.updatedAtGe);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.updatedAt) >= date
        );
      }

      if (query.updatedAtLe) {
        const date = new Date(query.updatedAtLe);
        filteredTools = filteredTools.filter(
          tool => new Date(tool.updatedAt) <= date
        );
      }

      // Pagination
      if (query.limit) {
        filteredTools = filteredTools.slice(0, query.limit);
      }
    }

    return filteredTools;
  }

  async findById(id: string): Promise<Tool | null> {
    return this.tools.find(tool => tool.id === id) || null;
  }

  async create(tool: Tool): Promise<Tool> {
    this.tools.push(tool);
    return tool;
  }

  async update(id: string, tool: Partial<Tool>): Promise<Tool> {
    const index = this.tools.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Tool with ID ${id} not found`);
    }

    this.tools[index] = { ...this.tools[index], ...tool };
    return this.tools[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.tools.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Tool with ID ${id} not found`);
    }

    this.tools.splice(index, 1);
  }
}
