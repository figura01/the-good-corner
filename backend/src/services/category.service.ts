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
        const categories = await Category.find({
            relations: {
                ads: true,
            },
        });
    }

    async create({ name }: ICreateCategory) {
        const newCategory = Category.create({ name });
        const errors = await validate(newCategory);
        return await newCategory.save()
    }

    find() {}
}