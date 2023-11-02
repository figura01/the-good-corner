export interface IListTag {
    name: string;
    // ads: Ads[]
  }
export interface ICreateTag {
  name: string;
  // ads: Ads[]
}

export interface UpdateTagInput {
  id: number;
  name: string;
}