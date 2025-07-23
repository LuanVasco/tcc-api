import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnersService } from './owners.service';
import { GetOwnersQueryDto } from './dto/get-owners-query.dto';
import { OwnersResponse, Owner } from './interfaces/owner.interface';

/**
 * OwnersController expõe as rotas REST para consulta de titulares (Owners). 
 * ROTAS:
 *  GET /owners       -> lista titulares com paginação e filtro por link
 *  GET /owners/:id   -> detalhes de um titular específico
 */
@ApiTags('Titulares')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('owners')
export class OwnersController {
  constructor(private readonly service: OwnersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar titulares de contas conectadas' })
  async list(@Query() query: GetOwnersQueryDto): Promise<OwnersResponse> {
    // external_id não suportado pelo Owners, filtramos apenas por link no frontend/backend
    return this.service.listOwners(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um titular pelo ID' })
  async getById(@Param('id') id: string): Promise<Owner> {
    return this.service.getOwnerById(id);
  }
}