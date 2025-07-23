import { Injectable } from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';

@Injectable()
export class ConsentsService {
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  async listConsents(userDocument: string): Promise<any> {
    const params = { user_document: userDocument };
    console.log(params);
    return this.belvoClient.request('/consents/', 'GET', undefined, params);
  }
}
