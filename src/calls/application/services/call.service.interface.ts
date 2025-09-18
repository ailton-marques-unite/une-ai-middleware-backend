import { Call } from '../../domain/entities/call.entity';
import { CreateCallDto } from '../dtos/create-call.dto';
import { UpdateCallDto } from '../dtos/update-call.dto';
import { ListCallsQueryDto } from '../dtos/list-calls-query.dto';

export interface CallServiceInterface {
  findAll(query: ListCallsQueryDto): Promise<Call[]>;
  findById(id: string): Promise<Call>;
  create(data: CreateCallDto): Promise<Call>;
  update(id: string, data: UpdateCallDto): Promise<Call>;
  delete(id: string): Promise<void>;
}
