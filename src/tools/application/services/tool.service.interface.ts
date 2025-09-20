import { ListToolsQueryDto } from '../dtos/list-tools-query.dto';
import { ToolResponseDto } from '../dtos/tool-response.dto';

export interface ToolServiceInterface {
  findAll(query: ListToolsQueryDto): Promise<ToolResponseDto[]>;
}
