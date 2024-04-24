import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly repo:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    this.repo.create(createCategoryDto);
    return await this.repo.save(createCategoryDto);
  }

  async findAll() {
    return (await this.repo.find()).reverse();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({id});
    if(!category){
      throw new BadRequestException('Category not found');
    }
    category.modifiedOn = new Date(Date.now());
    Object.assign(category,updateCategoryDto);
    return await this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.repo.findOneBy({});
    if(!category){
      throw new BadRequestException('Catgory not found');
    }
    await this.repo.remove(category);
    return{
      success:'true',
      category
    }
  }
}
