import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PhoneNumberController } from './infrastructure/controllers/phone-number.controller';
import { PhoneNumberService } from './application/services/phone-number.service';
import { PhoneNumberRepository } from './infrastructure/repositories/phone-number.repository';

@Module({
  imports: [HttpModule],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberRepository, PhoneNumberService],
  exports: [PhoneNumberService, PhoneNumberRepository],
})
export class PhoneNumbersModule {}
