import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({ relations: ['produtos'], });
  }


  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos']
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }

    return categoria;
  }


  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const buscarCategoria = await this.findById(id);
    if (!buscarCategoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    await this.categoriaRepository.update(id, categoria);
    return await this.findById(id);
  }


  async delete(id: number): Promise<void> {
    const buscarCategoria = await this.findById(id);
    if (!buscarCategoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    await this.categoriaRepository.delete(id);
  }

}