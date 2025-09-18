import { Call } from '../entities/call.entity';
import { CreateCallDto } from '../../application/dtos/create-call.dto';
import { UpdateCallDto } from '../../application/dtos/update-call.dto';
import { ListCallsQueryDto } from '../../application/dtos/list-calls-query.dto';

export interface CallRepositoryInterface {
  findAll(query: ListCallsQueryDto): Promise<Call[]>;
  findById(id: string): Promise<Call | null>;
  create(data: CreateCallDto): Promise<Call>;
  update(id: string, data: UpdateCallDto): Promise<Call>;
  delete(id: string): Promise<void>;
}
