// src/modules/links/links.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BelvoHttpClient } from 'src/infra/http/belvo/belvo.http-client';
import { GetLinksQueryDto } from './dto/get-links-query.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { CompleteLinkDto } from './dto/complete-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { UpdateLinkCredentialsDto } from './dto/update-link-credentials.dto';
import { LinksResponse, Link } from './interfaces/link.interface';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);

  constructor(private readonly belvoClient: BelvoHttpClient) {}

  // GET /api/links/
  listLinks(query: GetLinksQueryDto): Promise<LinksResponse> {
    const params = this.cleanParams(query);
    // :contentReference[oaicite:0]{index=0}
    return this.belvoClient.request('/links/', 'GET', undefined, params);
  }

  // POST /api/links/
  async createLink(dto: CreateLinkDto): Promise<Link> {
    // 1. Ajuste de uppercase e inclusão de credentials_storage
    const payload = {
      ...dto,
      fetch_resources: (dto.fetch_resources ?? []).map(r => r.toUpperCase()),
      credentials_storage: dto.credentials_storage ?? '27d',
    };

    this.logger.debug(
      'Payload de createLink: ' + JSON.stringify(payload, null, 2),
    );
    try {
      return await this.belvoClient.request('/links/', 'POST', payload);
    } catch (err: any) {
      // 2. Log detalhado do erro que a Belvo retorna
      this.logger.error(
        `Erro ao criar link: ${err.response?.status}\n` +
          JSON.stringify(err.response?.data, null, 2),
      );
      throw new InternalServerErrorException(
        'Falha ao criar link. Veja os logs para mais detalhes.',
      );
    }
  }

  // PATCH /api/links/  (completar sessão MFA)
  completeLink(dto: CompleteLinkDto): Promise<Link> {
    // :contentReference[oaicite:2]{index=2}
    return this.belvoClient.request('/links/', 'PATCH', dto);
  }

  // GET /api/links/{id}/
  getLinkById(id: string): Promise<Link> {
    return this.belvoClient.request(`/links/${id}/`, 'GET'); // :contentReference[oaicite:3]{index=3}
  }

  // PATCH /api/links/{id}/
  updateLink(id: string, dto: UpdateLinkDto): Promise<Link> {
    return this.belvoClient.request(`/links/${id}/`, 'PATCH', dto); // :contentReference[oaicite:4]{index=4}
  }

  // PUT /api/links/{id}/
  updateLinkCredentials(
    id: string,
    dto: UpdateLinkCredentialsDto,
  ): Promise<Link> {
    return this.belvoClient.request(`/links/${id}/`, 'PUT', dto); // :contentReference[oaicite:5]{index=5}
  }

  // DELETE /api/links/{id}/
  deleteLink(id: string): Promise<void> {
    return this.belvoClient.request(`/links/${id}/`, 'DELETE'); // :contentReference[oaicite:6]{index=6}
  }

  private cleanParams(dto: Record<string, any>): Record<string, string> {
    const formatted: Record<string, string> = {};
    Object.entries(dto).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        formatted[k] = Array.isArray(v) ? v.join(',') : String(v);
      }
    });
    return formatted;
  }
}
