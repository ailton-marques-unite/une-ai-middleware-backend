import { Injectable } from '@nestjs/common';
import { Assistant } from '../../domain/entities/assistant.entity';
import { CreateAssistantDto } from '../../application/dtos/create-assistant.dto';
import { UpdateAssistantDto } from '../../application/dtos/update-assistant.dto';
import { ListAssistantsQueryDto } from '../../application/dtos/list-assistants-query.dto';
import { AssistantRepositoryInterface } from '../../domain/repositories/assistant.repository.interface';

@Injectable()
export class AssistantRepository implements AssistantRepositoryInterface {
  private assistants: Assistant[] = [];

  async findAll(query: ListAssistantsQueryDto): Promise<Assistant[]> {
    let result = [...this.assistants];

    // Apply filters based on query parameters
    if (query.createdAtGt) {
      result = result.filter(a => new Date(a.createdAt) > new Date(query.createdAtGt));
    }
    if (query.createdAtLt) {
      result = result.filter(a => new Date(a.createdAt) < new Date(query.createdAtLt));
    }
    if (query.createdAtGe) {
      result = result.filter(a => new Date(a.createdAt) >= new Date(query.createdAtGe));
    }
    if (query.createdAtLe) {
      result = result.filter(a => new Date(a.createdAt) <= new Date(query.createdAtLe));
    }
    if (query.updatedAtGt) {
      result = result.filter(a => new Date(a.updatedAt) > new Date(query.updatedAtGt));
    }
    if (query.updatedAtLt) {
      result = result.filter(a => new Date(a.updatedAt) < new Date(query.updatedAtLt));
    }
    if (query.updatedAtGe) {
      result = result.filter(a => new Date(a.updatedAt) >= new Date(query.updatedAtGe));
    }
    if (query.updatedAtLe) {
      result = result.filter(a => new Date(a.updatedAt) <= new Date(query.updatedAtLe));
    }

    // Apply limit
    if (query.limit) {
      result = result.slice(0, query.limit);
    }

    return result;
  }

  async findById(id: string): Promise<Assistant | null> {
    return this.assistants.find(assistant => assistant.id === id) || null;
  }

  async create(data: CreateAssistantDto): Promise<Assistant> {
    const now = new Date().toISOString();
    const assistant: Assistant = {
      id: this.generateId(),
      orgId: 'default-org',
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    this.assistants.push(assistant);
    return assistant;
  }

  async update(id: string, data: UpdateAssistantDto): Promise<Assistant> {
    const index = this.assistants.findIndex(assistant => assistant.id === id);
    if (index === -1) {
      return null;
    }

    const updatedAssistant: Assistant = {
      ...this.assistants[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.assistants[index] = updatedAssistant;
    return updatedAssistant;
  }

  async delete(id: string): Promise<void> {
    const index = this.assistants.findIndex(assistant => assistant.id === id);
    if (index !== -1) {
      this.assistants.splice(index, 1);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
