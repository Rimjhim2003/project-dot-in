import { UserRoles } from "../user.roles";
import { BeforeInsert, Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'; 

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()    
    id:number

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    email:string
    
    @Column({select:false})
    password:string

    @Column({type:'enum', enum:UserRoles,default:UserRoles.Reader})
    roles:UserRoles;

    @BeforeInsert()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,10);
    }
}
