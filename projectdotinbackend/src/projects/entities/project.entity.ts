import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @Column({default:null})
    description:string;

    @Column({type:'timestamp',default:():string=>'CURRENT_TIMESTAMP'})
    createdOn:Date;

    @Column({type:'timestamp', default:():string=>'CURRENT_TIMESTAMP'})
    modifiedOn:Date;

    @Column()
    imageUrl:string;

}
