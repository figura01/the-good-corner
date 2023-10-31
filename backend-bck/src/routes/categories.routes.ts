import { Router, Request, Response } from "express";
import { Category } from "../entities/category.entity";
import CategoryService from "../services/category.service";
import { ICreateCategory } from "../types/category";
const router = Router();

router.get("/list", async (_, res: Response) => {
  console.log("je suis dans categories");
  try {
    const categories = await new CategoryService().list();
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: ICreateCategory = req.body;
    const newCategory = await new CategoryService().create({ ...data });
    res.send(newCategory);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/find/:id", async (req: Request, res: Response) => {
  console.log("route categories/find/:id");
  try {
    res.send("toto")
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;