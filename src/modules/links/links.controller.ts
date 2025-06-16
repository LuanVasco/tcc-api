// src/modules/links/links.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LinksService } from './links.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetLinksQueryDto } from './dto/get-links-query.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { CompleteLinkDto } from './dto/complete-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { UpdateLinkCredentialsDto } from './dto/update-link-credentials.dto';
import { LinksResponse, Link } from './interfaces/link.interface';

interface JwtUser {
  sub: string;
}

@ApiTags('Links')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os links da conta logada' })
  async listLinks(
    @Query() query: GetLinksQueryDto,
    @Req() req: Request & { user: JwtUser },
  ): Promise<LinksResponse> {
    return this.linksService.listLinks(query, req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar um novo link' })
  async createLink(
    @Body() dto: CreateLinkDto,
    @Req() req: Request & { user: JwtUser },
  ): Promise<Link> {
    return this.linksService.createLink(dto, req.user.sub);
  }

  @Patch()
  @ApiOperation({ summary: 'Completar sessão (MFA) de link' })
  async completeLink(@Body() dto: CompleteLinkDto): Promise<Link> {
    return this.linksService.completeLink(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de um link' })
  async getLinkById(
    @Param('id') id: string,
    @Req() req: Request & { user: JwtUser },
  ): Promise<Link> {
    return this.linksService.getLinkById(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar dados de um link' })
  async updateLink(
    @Param('id') id: string,
    @Body() dto: UpdateLinkDto,
    @Req() req: Request & { user: JwtUser },
  ): Promise<Link> {
    return this.linksService.updateLink(id, dto, req.user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar credenciais de um link' })
  async updateLinkCredentials(
    @Param('id') id: string,
    @Body() dto: UpdateLinkCredentialsDto,
    @Req() req: Request & { user: JwtUser },
  ): Promise<Link> {
    return this.linksService.updateLinkCredentials(id, dto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um link' })
  async deleteLink(
    @Param('id') id: string,
    @Req() req: Request & { user: JwtUser },
  ): Promise<void> {
    return this.linksService.deleteLink(id, req.user.sub);
  }
}
