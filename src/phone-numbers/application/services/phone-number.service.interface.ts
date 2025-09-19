import { CreatePhoneNumberDto } from '../dtos/create-phone-number.dto';
import { UpdatePhoneNumberDto } from '../dtos/update-phone-number.dto';
import { ListPhoneNumbersQueryDto } from '../dtos/list-phone-numbers-query.dto';
import { PhoneNumberResponseDto } from '../dtos/phone-number-response.dto';

export interface PhoneNumberServiceInterface {
  findAll(query: ListPhoneNumbersQueryDto): Promise<PhoneNumberResponseDto[]>;
  findById(id: string): Promise<PhoneNumberResponseDto>;
  create(createPhoneNumberDto: CreatePhoneNumberDto): Promise<PhoneNumberResponseDto>;
  update(id: string, updatePhoneNumberDto: UpdatePhoneNumberDto): Promise<PhoneNumberResponseDto>;
  delete(id: string): Promise<void>;
}
