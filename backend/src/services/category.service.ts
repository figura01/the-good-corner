import { Request } from "express";
import { Repository } from "typeorm";

import { Category } from "../entities/category.entity";
import { validate } from "class-validator";
import { ICreateCategory } from "../types/category";
import datasource from '../db';

export default class CategoryService{
    db: Repository<Category>;
    constructor(){
        this.db = datasource.getRepository(Category)
    }
    async list() {
        const categories = await this.db.find({
            relations: {
              ads: true,
            },
        });
      
        return categories;
    }

    async create({ name }: ICreateCategory) {
        const newCategory = Category.create({ name });
        const errors = await validate(newCategory);
        return await newCategory.save()
    }

    async find(id: number) {
        return await this.db.findOneBy({id})
    }

    async delete(id: number) {
        const categoryToDelete = await this.db.findOneBy({
          id,
        });
        if (!categoryToDelete) {
          throw new Error("Ce categorie n'existe pas");
        }
        await this.db.remove(categoryToDelete);
    
        return categoryToDelete;
      }
}