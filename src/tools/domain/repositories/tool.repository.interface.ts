import { Tool } from '../entities/tool.entity';

export interface ToolRepositoryInterface {
  findAll(query?: any): Promise<Tool[]>;
}
