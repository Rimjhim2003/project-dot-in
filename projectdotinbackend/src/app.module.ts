import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'103.93.16.46',
      database:'projec15_ProjectDotIn',
      username: 'projec15_projec15',
      password:'Amanata@2004',
      port:3306,
      autoLoadEntities:true,
      synchronize:true
    }),
    ProjectsModule,
    AuthModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
