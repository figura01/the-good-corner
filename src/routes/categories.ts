import { Router, Request, Response } from "express";
import { Category } from "../entities/category";
const router = Router();

router.get("/", async (_, res: Response) => {
    try {
      const categories = await Category.find({
        relations: {
          ads: true,
        },
      });
      res.send(categories);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
});

export default router;