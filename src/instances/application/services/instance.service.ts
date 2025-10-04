import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstanceDto } from '../dtos/create-instance.dto';
import { UpdateInstanceDto } from '../dtos/update-instance.dto';
import { Instance } from '../../domain/entities/instance.entity';
import { CreateInstanceResponse } from '../dtos/responses/create-instance.response';
import { InstanceRepository } from '../../infrastructure/repositories/instance.repository';
import { InstanceServiceInterface } from './instance.service.interface';
import { SetPresenceDto } from '../dtos/set-presence.dto';

@Injectable()
export class InstanceService implements InstanceServiceInterface {
  constructor(private readonly instanceRepository: InstanceRepository) {}

  async create(createInstanceDto: CreateInstanceDto): Promise<CreateInstanceResponse> {
    return this.instanceRepository.create(createInstanceDto);
  }

  async fetchByName(instanceName: string, instanceId?: string): Promise<Instance> {
    const instance = await this.instanceRepository.fetchByName(instanceName, instanceId || null);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  findAll() {
    return `This action returns all instances`;
  }

  async findByName(instanceName: string, number?: string): Promise<Instance> {
    const instance = await this.instanceRepository.findByName(instanceName, number || null);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async findStatusConnect(instanceName: string): Promise<Instance> {
    const instance = await this.instanceRepository.findStatusConnect(instanceName);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async update(instanceName: string): Promise<Instance> {
    const instance = await this.instanceRepository.update(instanceName);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async logout(instanceName: string): Promise<Instance> {
    const instance = await this.instanceRepository.logout(instanceName);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async delete(instanceName: string): Promise<Instance> {
    const instance = await this.instanceRepository.delete(instanceName);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async setPresence(instanceName: string, setPresenceDto: SetPresenceDto): Promise<Instance> {
    const instance = await this.instanceRepository.setPresence(instanceName, setPresenceDto);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }
}
