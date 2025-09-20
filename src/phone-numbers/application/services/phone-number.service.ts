import { Injectable, NotFoundException } from '@nestjs/common';
import { PhoneNumberRepository } from '../../infrastructure/repositories/phone-number.repository';
import { PhoneNumberServiceInterface } from './phone-number.service.interface';
import { CreatePhoneNumberRequestDto } from '../dtos/phone-number-request.dto';
import { PhoneNumberResponseDto } from '../dtos/phone-number-response.dto';
import {
  PhoneNumber,
  PhoneNumberStatus,
} from '../../domain/entities/phone-number.entity';

@Injectable()
export class PhoneNumberService implements PhoneNumberServiceInterface {
  constructor(private readonly phoneNumberRepository: PhoneNumberRepository) {}

  async findById(id: string): Promise<PhoneNumberResponseDto> {
    const phoneNumber = await this.phoneNumberRepository.findById(id);
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID ${id} not found`);
    }
    return this.mapToResponseDto(phoneNumber);
  }

  async create(
    createPhoneNumberDto: CreatePhoneNumberRequestDto,
  ): Promise<PhoneNumberResponseDto> {
    const createdPhoneNumber =
      await this.phoneNumberRepository.create(createPhoneNumberDto);
    return this.mapToResponseDto(createdPhoneNumber);
  }

  private mapToResponseDto(phoneNumber: PhoneNumber): PhoneNumberResponseDto {
    return {
      id: phoneNumber.id,
      orgId: phoneNumber.orgId,
      number: phoneNumber.number,
      countryCode: phoneNumber.countryCode,
      areaCode: phoneNumber.areaCode,
      type: phoneNumber.type,
      status: phoneNumber.status,
      provider: phoneNumber.provider,
      providerId: phoneNumber.providerId,
      capabilities: phoneNumber.capabilities,
      cost: phoneNumber.cost,
      description: phoneNumber.description,
      friendlyName: phoneNumber.friendlyName,
      voiceUrl: phoneNumber.voiceUrl,
      smsUrl: phoneNumber.smsUrl,
      statusCallback: phoneNumber.statusCallback,
      statusCallbackMethod: phoneNumber.statusCallbackMethod,
      tags: phoneNumber.tags,
      metadata: phoneNumber.metadata,
      createdAt: phoneNumber.createdAt,
      updatedAt: phoneNumber.updatedAt,
      purchasedAt: phoneNumber.purchasedAt,
      expiresAt: phoneNumber.expiresAt,
      isActive: phoneNumber.isActive,
      region: phoneNumber.region,
      locality: phoneNumber.locality,
      addressRequirements: phoneNumber.addressRequirements,
      beta: phoneNumber.beta,
      emergencyAddressSid: phoneNumber.emergencyAddressSid,
      emergencyStatus: phoneNumber.emergencyStatus,
      identitySid: phoneNumber.identitySid,
      origin: phoneNumber.origin,
      phoneNumberSid: phoneNumber.phoneNumberSid,
      trunkSid: phoneNumber.trunkSid,
      uri: phoneNumber.uri,
      voiceApplicationSid: phoneNumber.voiceApplicationSid,
      voiceCallerIdLookup: phoneNumber.voiceCallerIdLookup,
      voiceFallbackMethod: phoneNumber.voiceFallbackMethod,
      voiceFallbackUrl: phoneNumber.voiceFallbackUrl,
      voiceMethod: phoneNumber.voiceMethod,
      voiceReceiveMode: phoneNumber.voiceReceiveMode,
      smsApplicationSid: phoneNumber.smsApplicationSid,
      smsFallbackMethod: phoneNumber.smsFallbackMethod,
      smsFallbackUrl: phoneNumber.smsFallbackUrl,
      smsMethod: phoneNumber.smsMethod,
      statusCallbackEvent: phoneNumber.statusCallbackEvent,
      statusCallbackUrl: phoneNumber.statusCallbackUrl,
    };
  }

  private generateId(): string {
    return `ph_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
