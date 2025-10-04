import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PhoneNumberRepositoryInterface } from '../../domain/repositories/phone-number.repository.interface';
import { PhoneNumber } from '../../domain/entities/phone-number.entity';
import { CreatePhoneNumberRequestDto } from '../../application/dtos/phone-number-request.dto';

@Injectable()
export class PhoneNumberRepository implements PhoneNumberRepositoryInterface {
  private readonly baseUrl = `${process.env.VAPI_API_URL}/phone-number`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): { Authorization: string } {
    const token = this.configService.get<string>('VAPI_SECRET_KEY');
    return { Authorization: `Bearer ${token}` };
  }

  async findById(id: string): Promise<PhoneNumber | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PhoneNumber>(`${this.baseUrl}/${id}`, {
          headers: this.getAuthHeader(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  }

  async create(request: CreatePhoneNumberRequestDto): Promise<PhoneNumber> {
    const response = await firstValueFrom(
      this.httpService.post<PhoneNumber>(this.baseUrl, request, {
        headers: this.getAuthHeader(),
      }),
    );
    return response.data;
  }
}
