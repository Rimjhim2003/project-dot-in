import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile,UseInterceptors,BadRequestException, Res} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads',
      filename:(req,file,callback)=>{
        const name = file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        const path = name.split(" ").join('_')+'_'+Date.now()+'.'+extension;
        callback(null,path);
      }
    }),
    fileFilter:(req,file,callback) =>{
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(null,false);
      }    
      callback(null,true);
    }
  }))
  create(@Body() createProjectDto: CreateProjectDto,@UploadedFile() file:Express.Multer.File) {
    return this.projectsService.create(createProjectDto,file);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads',
      filename:(req,file,callback)=>{
        const name = file.originalname.split('.')[0];
        const extension = file.originalname.split('.')[1];
        const path = name.split(" ").join('_')+'_'+Date.now()+'.'+extension;
        callback(null,path);
      }
    }),
    fileFilter:(req,file,callback) =>{
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new BadRequestException('Invalid file format'),false);
      }    
      callback(null,true);
    }
  }))
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @UploadedFile() file:Express.Multer.File) {
    return this.projectsService.update(+id, updateProjectDto,file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res:Response){
    res.sendFile(filename,{
      root:'./uploads'
    })
  }
} 
