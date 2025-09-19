import { Analytics } from '../entities/analytics.entity';

export interface AnalyticsRepositoryInterface {
  findAll(query?: any): Promise<Analytics[]>;
  findById(id: string): Promise<Analytics | null>;
  create(analytics: Analytics): Promise<Analytics>;
  update(id: string, analytics: Partial<Analytics>): Promise<Analytics>;
  delete(id: string): Promise<void>;
}
