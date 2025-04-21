// src/infra/http/belvo/belvo.http-client.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BelvoHttpClient {
  private readonly baseUrl = 'https://sandbox.belvo.com/api';
  private readonly authHeader: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    const id = this.configService.get<string>('BELVO_SECRET_ID');
    const password = this.configService.get<string>('BELVO_SECRET_PASSWORD');

    this.authHeader = `Basic ${Buffer.from(`${id}:${password}`).toString('base64')}`;
  }

  async request<T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    params?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.http.request<T>({
          url: `${this.baseUrl}${endpoint}`,
          method,
          headers: {
            Authorization: this.authHeader,
            'Content-Type': 'application/json',
          },
          data: body,
          params,
        }),
      );

      return response.data;
    } catch (error) {
      console.error(
        '[Belvo] Erro na requisição:',
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || 'Erro na requisição para a API Belvo',
      );
    }
  }
}
