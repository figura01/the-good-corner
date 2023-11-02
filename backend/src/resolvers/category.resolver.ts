import { Query, Resolver, Mutation, Arg } from "type-graphql";
import CategoryService from "../services/category.service";
import { ICreateCategory } from "../types/category";
import { Category, CreateCategoryInput } from "../entities/category.entity";

@Resolver(() => Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async listCategories() {
    //toute ma logique de récupération de categories
    const categories = await new CategoryService().list();
    return categories;
  }

  @Query(() => Category)
  async findCategory(@Arg("id") id: string) {
      console.log(id);
      const category = await new CategoryService().find(+id);
      return category;
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") data:CreateCategoryInput) {
    const newCategory = await new CategoryService().create({ ...data });
    return newCategory;
  }
  async deleteCategory(@Arg("id") id: string) {
    return await new CategoryService().delete(+id)
  }

};
