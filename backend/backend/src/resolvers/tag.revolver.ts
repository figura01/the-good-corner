import TagService from "../services/tag.service";
import CategoryService from "../services/category.service";
import { ICreateTag } from "../types/tag";

export default {
    Query: {
        listTags: async () => {
          const tags = new TagService().list();
          return tags;
        },
    },
    Mutation: {
        createTag: async (_: any, { data }: { data: ICreateTag }) => {
          const newTag = await new TagService().create({ ...data });
          return newTag;
        },
        deleteTag: async (_: any, { id }: { id: string }) => {
            return await new TagService().delete(+id)
        }
    },
}