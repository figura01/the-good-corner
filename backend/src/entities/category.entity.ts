import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Ad } from "./ad.entity";
import { ArgsType, Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() =>  [Ad])
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

/**
 * Inputs
 */

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
