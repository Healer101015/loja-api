import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Produto } from './entities/produto.entity';







@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) { }

  // Método para criar um novo produto
  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }


  // read all

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({ relations: ['categoria'] });
  }


  // Método para buscar um produto por ID
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria']
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }


  // busca especifica por nome
  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: Like(`%${nome}%`) },
      relations: ['categoria']
    });
  }


  async update(id: number, produto: Produto): Promise<Produto> {
    const buscarProduto = await this.findById(id);
    if (!buscarProduto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    await this.produtoRepository.update(id, produto);
    return await this.findById(id);
  }



  async delete(id: number): Promise<void> {
    const buscarProduto = await this.findById(id);
    if (!buscarProduto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    await this.produtoRepository.delete(id);
  }

}



