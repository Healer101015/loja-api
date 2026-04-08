import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ProdutoService } from './produto.service';


@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }



  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string): Promise<Produto> {
    return this.produtoService.findById(+id);
  }


  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }


  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(+id, produto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.produtoService.delete(+id);
  }

}
