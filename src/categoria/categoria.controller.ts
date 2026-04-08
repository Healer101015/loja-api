import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<Categoria> {
    return this.categoriaService.findById(+id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByDescricao(@Param('descricao') descricao: string): Promise<Categoria[]> {
    return this.categoriaService.findByDescricao(descricao);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(+id, categoria);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.categoriaService.delete(+id);
  }
}