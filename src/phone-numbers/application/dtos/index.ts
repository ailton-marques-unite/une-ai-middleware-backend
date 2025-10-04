// Main request DTO
export {
  CreatePhoneNumberRequestDto,
  PhoneNumberProviderDto,
} from './phone-number-request.dto';

// Provider-specific DTOs
export { CreateByoPhoneNumberDto } from './byo-phone-number.dto';
export { CreateTwilioPhoneNumberDto } from './twilio-phone-number.dto';
export { CreateVapiPhoneNumberDto } from './vapi-phone-number.dto';
export { CreateVonagePhoneNumberDto } from './vonage-phone-number.dto';
export { CreateTelnyxPhoneNumberDto } from './telnyx-phone-number.dto';

// Response DTO
export { PhoneNumberResponseDto } from './phone-number-response.dto';
