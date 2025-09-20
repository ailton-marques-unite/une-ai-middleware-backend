import { CreatePhoneNumberRequestDto } from '../dtos/phone-number-request.dto';
import { PhoneNumberResponseDto } from '../dtos/phone-number-response.dto';

export interface PhoneNumberServiceInterface {
  findById(id: string): Promise<PhoneNumberResponseDto>;
  create(
    createPhoneNumberDto: CreatePhoneNumberRequestDto,
  ): Promise<PhoneNumberResponseDto>;
}
