// src/modules/widget/widget.service.ts
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { WidgetTokenResponseDto } from './dto/widget-token-response.dto';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(private readonly belvoClient: BelvoHttpClient) {}

  async generateWidgetToken(user: {
    sub: string;
    name: string;
    document: string;
  }): Promise<WidgetTokenResponseDto> {
    const body = {
      id: process.env.BELVO_SECRET_ID,
      password: process.env.BELVO_SECRET_PASSWORD,
      scopes: process.env.BELVO_WIDGET_SCOPES, // e.g. "read_institutions,write_links"
      stale_in: process.env.BELVO_WIDGET_STALE_IN, // e.g. "300d"
      fetch_resources: process.env.BELVO_WIDGET_FETCH_RESOURCES?.split(','), // e.g. ["ACCOUNTS","TRANSACTIONS","OWNERS"]
      // credentials_storage: process.env.BELVO_WIDGET_CREDENTIALS_STORAGE, // e.g. "store"
      widget: {
        purpose: process.env.BELVO_WIDGET_PURPOSE,
        openfinance_feature: 'consent_link_creation',
        callback_urls: {
          success: process.env.BELVO_WIDGET_CALLBACK_SUCCESS_URL,
          exit: process.env.BELVO_WIDGET_CALLBACK_EXIT_URL,
          event: process.env.BELVO_WIDGET_CALLBACK_EVENT_URL,
        },
        branding: {
          company_icon: process.env.BELVO_WIDGET_COMPANY_ICON_URL,
          company_logo: process.env.BELVO_WIDGET_COMPANY_LOGO_URL,
          company_name: process.env.BELVO_WIDGET_COMPANY_NAME,
          company_terms_url: process.env.BELVO_WIDGET_COMPANY_TERMS_URL,
          overlay_background_color: process.env.BELVO_WIDGET_OVERLAY_BG,
          social_proof: true,
        },
        consent: {
          terms_and_conditions_url: process.env.BELVO_WIDGET_TERMS_URL,
          permissions: [
            'REGISTER',
            'ACCOUNTS',
            'CREDIT_CARDS',
            'CREDIT_OPERATIONS',
          ],
          identification_info: [
            {
              type: 'CPF',
              number: user.document, // CPF do banco
              name: user.name, // Nome do usuário
            },
          ],
        },
      },
    };
    // **1. Debug do payload**
    this.logger.debug('Payload para /token/: ' + JSON.stringify(body, null, 2));

    try {
      return await this.belvoClient.request('/token/', 'POST', body);
    } catch (err: any) {
      this.logger.error(
        `Erro ao gerar token: ${err.response?.status} – ${JSON.stringify(err.response?.data) || err.message}`,
      );
      throw new InternalServerErrorException('Falha ao gerar token do widget.');
    }
    // POST /api/token/ — gera o access token do widget :contentReference[oaicite:0]{index=0}
    // return this.belvoClient.request('/token/', 'POST', body);
  }
}
