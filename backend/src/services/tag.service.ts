import { Like, Repository } from "typeorm";
import { Tag } from "../entities/tag.entity";
import datasource from "../db";
import { validate } from "class-validator";
import { ICreateTag, UpdateTagInput } from "../types/tag";
export default class TagService {
  db: Repository<Tag>;

  constructor() {
    this.db = datasource.getRepository(Tag);
  }

  async list(name: string) {
    const tags = await this.db.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
    });
    return tags;
  }

  async create(data: ICreateTag) {
    const newTag = this.db.create(data);

    return await this.db.save(newTag);
  }
  async delete(id: number) {
    const tagToDelete = await this.db.findOneBy({
      id,
    });
    if (!tagToDelete) {
      throw new Error("Ce tag n'existe pas");
    }
    await this.db.remove(tagToDelete);

    return tagToDelete;
  }

  async find(id: number) {
    return await this.db.findOneBy({id})
  }

  async update(id: number, data: Omit<UpdateTagInput, "id">) {
    const tagToUpdate = await this.find(id);
    if (!tagToUpdate) {
      throw new Error("L'annonce n'existe pas!");
    }
    const tagToSave = this.db.merge(tagToUpdate, data as Partial<Tag>);
    const errors = await validate(tagToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("il y a eu une erreur");
    }

    return await this.db.save(tagToSave);
}
}