import { AssistantResponseDto } from '@/assistants/application/dtos/assistant-response.dto';

const secretKey = process.env.VAPI_SECRET_KEY || '';

interface IAssistantsAPIProvider {
  findAssistantById(
    id: string,
    headers: {
      'Content-Type': 'application/json';
      Authorization: `Bearer ${typeof secretKey}`;
    },
  ): Promise<
    {
      status: number;
      data: AssistantResponseDto;
    }[]
  >;
}

export { IAssistantsAPIProvider };
