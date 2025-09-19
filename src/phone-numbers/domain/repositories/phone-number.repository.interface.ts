import { PhoneNumber } from '../entities/phone-number.entity';

export interface PhoneNumberRepositoryInterface {
  findAll(query?: any): Promise<PhoneNumber[]>;
  findById(id: string): Promise<PhoneNumber | null>;
  create(phoneNumber: PhoneNumber): Promise<PhoneNumber>;
  update(id: string, phoneNumber: Partial<PhoneNumber>): Promise<PhoneNumber>;
  delete(id: string): Promise<void>;
}
