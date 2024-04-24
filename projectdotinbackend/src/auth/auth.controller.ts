import { Controller, Get, Post, Body, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-entity.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async userRegistration(@Body() createUserDto:CreateUserDto){
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async userLogin(@Body() userLoginDto:UserLoginDto, @Res() res:Response){
    const {token,user} = await this.authService.login(userLoginDto);

    res.cookie('IsAuthenticated',true,{maxAge:2*60*60*1000});
    res.cookie('Authentication',token,{
      httpOnly:true,
      maxAge:2*60*60*1000
    });

    return res.send({
      success:true,
      user
    })
  }   

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
