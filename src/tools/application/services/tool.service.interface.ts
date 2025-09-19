import { CreateToolDto } from '../dtos/create-tool.dto';
import { UpdateToolDto } from '../dtos/update-tool.dto';
import { ListToolsQueryDto } from '../dtos/list-tools-query.dto';
import { ToolResponseDto } from '../dtos/tool-response.dto';

export interface ToolServiceInterface {
  findAll(query: ListToolsQueryDto): Promise<ToolResponseDto[]>;
  findById(id: string): Promise<ToolResponseDto>;
  create(createToolDto: CreateToolDto): Promise<ToolResponseDto>;
  update(id: string, updateToolDto: UpdateToolDto): Promise<ToolResponseDto>;
  delete(id: string): Promise<void>;
}
