import { BadRequestException, Injectable,UploadedFile,UseInterceptors  } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProjectsService {
  constructor (@InjectRepository(Project) private readonly repo:Repository<Project>){}


  async create(createProjectDto: CreateProjectDto,file: Express.Multer.File) {
    const project = new Project();
    if(!file){
      throw new BadRequestException('File is not an image');
    }else{
      project.imageUrl=  `https://rigid-ticket-production.up.railway.app/projects/pictures/${file.filename}`
    }
    Object.assign(project,createProjectDto);

    this.repo.create(project);
    return await this.repo.save(project);
  }

  async findAll() {
    return (await this.repo.find()).reverse();
  }

  async findOne(id: number) {
    const project = await this.repo.findOneBy({id});
    if(!project){
      throw new BadRequestException('Project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto,file:Express.Multer.File) {
    const project = await this.repo.findOneBy({id});
    if(!project){
      throw new BadRequestException('Project not found');
    }
    try{
    if(project.imageUrl && file){
      const imagePath = path.join('./uploads',project.imageUrl.split('/')[project.imageUrl.split('/').length-1]);
      fs.unlinkSync(imagePath);
      project.imageUrl = `https://rigid-ticket-production.up.railway.app/projects/pictures/${file.filename}`;
    }}catch(error){}

    project.modifiedOn= new Date(Date.now());
    Object.assign(project,updateProjectDto);
    return this.repo.save(project);
  }

  async remove(id: number) {
    const project = await this.repo.findOneBy({id});

    if(!project){
      throw new  BadRequestException('Project Not found');
    }
    try{
    if(project.imageUrl){
      const imagePath = path.join('./uploads',project.imageUrl.split('/')[project.imageUrl.split('/').length-1]);
      fs.unlinkSync(imagePath);
    }}catch(error){}
    await this.repo.remove(project);

    return {
      success:true,
      project
    }; 
  }

}
