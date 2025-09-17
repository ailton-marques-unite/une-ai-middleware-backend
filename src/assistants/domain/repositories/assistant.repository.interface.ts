import { Assistant } from '../entities/assistant.entity';
import { CreateAssistantDto } from '../../application/dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../application/dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../application/dtos/list-assistants-query.dto';

export interface AssistantRepositoryInterface {
  findAll(query: ListAssistantsQueryDto): Promise<Assistant[]>;
  findById(id: string): Promise<Assistant | null>;
  create(data: CreateAssistantDto): Promise<Assistant>;
  update(id: string, data: UpdateAssistantDto): Promise<Assistant>;
  delete(id: string): Promise<void>;
}
