// src/whatsapp/dto/send-message.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  recipient: string; // Ex: '5511912345678'

  @IsString()
  @IsNotEmpty()
  message: string;
}
