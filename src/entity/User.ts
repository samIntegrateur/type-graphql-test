import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    // no column here, just a graphql schema to concatenate firstname and lastname
    @Field()
    name: string;

    @Field()
    @Column('text', { unique: true })
    email: string;

    // no field, we dont want to expose the password
    @Column()
    password: string;

}
