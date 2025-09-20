import { Injectable, NotFoundException } from '@nestjs/common';
import { Call } from '../../domain/entities/call.entity';
import { CreateCallDto } from '../dtos/create-call.dto';
import { UpdateCallDto } from '../dtos/update-call.dto';
import { ListCallsQueryDto } from '../dtos/list-calls-query.dto';
import { CallRepository } from '../../infrastructure/repositories/call.repository';
import { CallServiceInterface } from './call.service.interface';

@Injectable()
export class CallService implements CallServiceInterface {
  constructor(private readonly callRepository: CallRepository) {}

  async findAll(query: ListCallsQueryDto): Promise<Call[]> {
    return this.callRepository.findAll(query);
  }

  async findById(id: string): Promise<Call> {
    const call = await this.callRepository.findById(id);
    if (!call) {
      throw new NotFoundException(`Call with ID ${id} not found`);
    }
    return call;
  }

  async create(data: CreateCallDto): Promise<Call> {
    return this.callRepository.create(data);
  }

  async update(id: string, data: UpdateCallDto): Promise<Call> {
    const existingCall = await this.findById(id);
    if (!existingCall) {
      throw new NotFoundException(`Call with ID ${id} not found`);
    }
    return this.callRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const existingCall = await this.findById(id);
    if (!existingCall) {
      throw new NotFoundException(`Call with ID ${id} not found`);
    }
    return this.callRepository.delete(id);
  }
}
