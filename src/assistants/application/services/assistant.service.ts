import { Injectable, NotFoundException } from '@nestjs/common';
import { Assistant } from '../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../dtos/list-assistants-query.dto';
import { AssistantRepository } from '../../infrastructure/repositories/assistant.repository';
import { AssistantServiceInterface } from './assistant.service.interface';

@Injectable()
export class AssistantService implements AssistantServiceInterface {
  constructor(
    private readonly assistantRepository: AssistantRepository,
  ) {}

  async findAll(query: ListAssistantsQueryDto): Promise<Assistant[]> {
    return this.assistantRepository.findAll(query);
  }

  async findById(id: string): Promise<Assistant> {
    const assistant = await this.assistantRepository.findById(id);
    if (!assistant) {
      throw new NotFoundException(`Assistant with ID ${id} not found`);
    }
    return assistant;
  }

  async create(data: CreateAssistantDto): Promise<Assistant> {
    return this.assistantRepository.create(data);
  }

  async update(id: string, data: UpdateAssistantDto): Promise<Assistant> {
    const existingAssistant = await this.findById(id);
    if (!existingAssistant) {
      throw new NotFoundException(`Assistant with ID ${id} not found`);
    }
    return this.assistantRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const existingAssistant = await this.findById(id);
    if (!existingAssistant) {
      throw new NotFoundException(`Assistant with ID ${id} not found`);
    }
    return this.assistantRepository.delete(id);
  }
}