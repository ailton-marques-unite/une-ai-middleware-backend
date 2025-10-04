import { Instance } from '../../domain/entities/instance.entity';

export interface InstanceServiceInterface {
  findByName(instanceName: string, number?: string): Promise<Instance | null>;
}
