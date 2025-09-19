import { Tool } from '../entities/tool.entity';

export interface ToolRepositoryInterface {
  findAll(query?: any): Promise<Tool[]>;
  findById(id: string): Promise<Tool | null>;
  create(tool: Tool): Promise<Tool>;
  update(id: string, tool: Partial<Tool>): Promise<Tool>;
  delete(id: string): Promise<void>;
}
