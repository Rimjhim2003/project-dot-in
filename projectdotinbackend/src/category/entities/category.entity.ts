import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


enum CategoryType{
    School='School',
    Enginner ='Engineer'
}

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column({type:'enum',enum:CategoryType})
    type: CategoryType

    @Column({type:'timestamp',default:():string=>'CURRENT_TIMESTAMP'})
    createdOn:Date;

    @Column({type:'timestamp', default:():string=>'CURRENT_TIMESTAMP'})
    modifiedOn:Date;

}
