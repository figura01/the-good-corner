import { Request } from "express";
import { Repository } from "typeorm";

import { Category } from "../entities/category.entity";
import { validate } from "class-validator";
import { ICreateCategory, UpdateCategoryInput } from "../types/category";
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
        return await this.db.findOne({ where: { id }, relations: { ads: true } });
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

    async update(id: number, data: Omit<UpdateCategoryInput, "id">) {
        const categoryToUpdate = await this.find(id);
        if (!categoryToUpdate) {
          throw new Error("L'annonce n'existe pas!");
        }
        const categoryToSave = this.db.merge(categoryToUpdate, data as Partial<Category>);
        const errors = await validate(categoryToSave);
        if (errors.length !== 0) {
          console.log(errors);
          throw new Error("il y a eu une erreur");
        }
    
        return await this.db.save(categoryToSave);
    }
}