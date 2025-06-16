// src/infra/http/belvo/belvo.http-client.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
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
      console.log(error.response);
      // Se houver resposta da Belvo, use status e data dela
      const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data ?? { message: error.message };
      // Lance HttpException com payload e status originais
      throw new HttpException(data, status);
    }
  }
}
