import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChatControllerDto {
    @ApiProperty({
        description: 'The phone number to send the message to',
        example: '1234567890'
    })
    @IsString()
    number: string;
}
