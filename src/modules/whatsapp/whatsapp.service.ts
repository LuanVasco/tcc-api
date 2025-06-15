// src/modules/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
// import waClient from '../../infra/http/whatsapp/whatsapp-client';

@Injectable()
export class WhatsappService {
  async sendTextMessage(recipient: string, message: string) {
    // try {
    //   const phoneNumber = Number(recipient);
    //   const sentMessage = waClient.messages.text(
    //     { body: message },
    //     phoneNumber,
    //   );
    //   const response = await sentMessage;
    //   return response.rawResponse();
    // } catch (error) {
    //   console.error('Erro ao enviar mensagem:', error);
    //   throw error;
    // }
  }
}
