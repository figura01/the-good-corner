import { Router, Request, Response } from "express";
import { Ad } from "../entities/ad.entity";
import { In } from "typeorm";
import { validate } from "class-validator";
import { IAdForm } from "../types/ad";
import CategoryService from "../services/category.service";
import AdsService from "../services/ads.service";
import { formatedErrors } from "../lib/utilities";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  console.log("routes liste")
  const { tagIds } = req.query;
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
      },
    });
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: IAdForm = req.body;
    // const { price, ...data }: IAdForm = req.body;
    // const newAd = await new AdsService().create({ ...data, price: +price });
    const newAd = await new AdsService().create(data);
    res.send(newAd);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(formatedErrors(err));
  }
});

router.get("/find/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    if(id) {
      const adFounded = await new AdsService().find(+id);
      if(!adFounded) {
        throw new Error("L'annonce n'existe pas");
      }
      res.status(200).json(adFounded)
    }
    
  }catch(err) {
    console.log(err)
    res.status(500).json(err);
  }

})

router.get("/listbycategory/:id", async (req: Request, res: Response) => {
  console.log("route listbycategory/:id")
  const { id } = req.params;

  const category = await new CategoryService().find(+id);
  if (!category) {
    throw new Error("La catégory n'existe pas");
  }
  try {
    const ads = await new AdsService().listByCategory(+id);
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: IAdForm = req.body;
    // const { price, ...data }: IAdForm = req.body;
    // const newAd = await new AdsService().create({ ...data, price: +price });
    const newAd = await new AdsService().create(data);
    console.log('newAd ====>', newAd)
    res.send(newAd);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(formatedErrors(err));
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
/**========================================================================
 *                           liste des routes ...
 *========================================================================**/

router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(404);

    await Ad.merge(adToUpdate, req.body);
    const errors = await validate(adToUpdate);
    if (errors.length !== 0) return res.status(422).send({ errors });

    res.send(await adToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;