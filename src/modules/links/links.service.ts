// src/modules/links/links.service.ts
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
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
  private async ensureOwnership(linkId: string, userId: string) {
    try {
      // Isso vai retornar 200 se o link existir pertencer ao userId, ou 404 caso contrário
      console.log(
        'Verificando propriedade do link:',
        linkId,
        'para usuário:',
        userId,
      );
      await this.belvoClient.request(
        '/links/' + linkId + '/',
        'GET',
        undefined,
        {
          external_id: userId,
        },
      );
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Falha ao acessar o link');
    }
  }
  constructor(private readonly belvoClient: BelvoHttpClient) {}

  // GET /api/links/
  listLinks(query: GetLinksQueryDto, userId: string): Promise<LinksResponse> {
    const params = this.cleanParams({ ...query, external_id: userId });
    return this.belvoClient.request('/links/', 'GET', undefined, params);
  }

  // POST /api/links/
  async createLink(dto: CreateLinkDto, userId: string): Promise<Link> {
    const payload = {
      ...dto,
      external_id: userId,
      fetch_resources: (dto.fetch_resources ?? []).map((r) => r.toUpperCase()),
      credentials_storage: dto.credentials_storage ?? 'none',
    };

    this.logger.debug(
      'Payload de createLink: ' + JSON.stringify(payload, null, 2),
    );

    return this.belvoClient.request('/links/', 'POST', payload);
  }

  // PATCH /api/links/  (completar sessão MFA)
  completeLink(dto: CompleteLinkDto): Promise<Link> {
    return this.belvoClient.request('/links/', 'PATCH', dto);
  }

  // GET /api/links/{id}/
  async getLinkById(id: string, userId: string): Promise<Link> {
    await this.ensureOwnership(id, userId);
    return this.belvoClient.request(`/links/${id}/`, 'GET');
  }

  // PATCH /api/links/{id}/
  async updateLink(
    id: string,
    dto: UpdateLinkDto,
    userId: string,
  ): Promise<Link> {
    await this.ensureOwnership(id, userId);
    return this.belvoClient.request(`/links/${id}/`, 'PATCH', dto);
  }

  // PUT /api/links/{id}/
  async updateLinkCredentials(
    id: string,
    dto: UpdateLinkCredentialsDto,
    userId: string,
  ): Promise<Link> {
    await this.ensureOwnership(id, userId);
    return this.belvoClient.request(`/links/${id}/`, 'PUT', dto);
  }

  // DELETE /api/links/{id}/
  async deleteLink(id: string, userId: string): Promise<void> {
    await this.ensureOwnership(id, userId);
    return this.belvoClient.request(`/links/${id}/`, 'DELETE');
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
