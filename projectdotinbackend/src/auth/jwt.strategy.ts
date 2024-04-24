import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from 'passport-jwt';

import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor (@InjectRepository(User) private readonly repo:Repository<User>){
        super({
            ignoreExpiration:true,
            secretOrKey:'secretKey',
            jwtFromRequest :ExtractJwt.fromExtractors([(request :Request)=>{
                return request?.cookies?.Authentication;
            }])
        });
    }

    async validate(payload, req:Request){
        if(!payload){
            throw new UnauthorizedException();
        }
        const user = await this.repo.findOneBy({email:payload.email});
        if(!user){
            throw new UnauthorizedException();
        }
        req.user = user;
        return req.user;
    }
}