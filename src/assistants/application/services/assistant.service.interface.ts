import { Assistant } from '../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../dtos/list-assistants-query.dto';

export interface AssistantServiceInterface {
  findAll(query: ListAssistantsQueryDto): Promise<Assistant[]>;
  findById(id: string): Promise<Assistant>;
  create(data: CreateAssistantDto): Promise<Assistant>;
  update(id: string, data: UpdateAssistantDto): Promise<Assistant>;
  delete(id: string): Promise<void>;
}
