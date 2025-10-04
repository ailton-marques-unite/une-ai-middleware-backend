import { Instance } from '../entities/instance.entity';
import { CreateInstanceDto } from '../../application/dtos/create-instance.dto';
import { UpdateInstanceDto } from '../../application/dtos/update-instance.dto';

export interface InstanceRepositoryInterface {
  findByName(instanceName: string, number?: string): Promise<Instance | null>;
}
