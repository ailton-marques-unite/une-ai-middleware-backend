import { PhoneNumber } from '../entities/phone-number.entity';
import { CreatePhoneNumberRequestDto } from '../../application/dtos/phone-number-request.dto';

export interface PhoneNumberRepositoryInterface {
  findById(id: string): Promise<PhoneNumber | null>;
  create(request: CreatePhoneNumberRequestDto): Promise<PhoneNumber>;
}
