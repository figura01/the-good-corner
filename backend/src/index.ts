import express, { Request, Response } from "express";
import {Ad} from "./utils/types";

const app = express();
const port = 3000;
app.use(express.json())

let ads: Ad[] = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];

app.get("/ad", (req: Request, res: Response) => {
    console.log(ads)
    res.send(ads);
});

app.post("/ad", (req: Request, res: Response) => {
    const id = ads.length + 1
    const createdAt = new Date().toISOString().toString();
    ads.push({
        ...req.body, 
        id, 
        createdAt
    });
    res.status(200).send("Request received, check the backend terminal");
});

app.patch("/ad/:id", (req: Request, res: Response) => {
    const idOfAd = parseInt(req.params.id, 10);
    const existedAd = ads.find(ad => ad.id === idOfAd);

    if(existedAd) {
        // existe
        ads = ads.map((ad) => {
            if(ad.id === idOfAd) {
                return {
                    ...ad,
                    ...req.body
                }
            } 
            return ad
        });
        res.status(200).send("Ad have successfully updated !")
    }else {
        // not existe
        res.status(200).send("Error can't update this Ad")
    }
});

app.delete("/ad/:id", (req: Request, res: Response) => {
    console.log("delete")
    const idOfAd = parseInt(req.params.id, 10);
    const existedAd = ads.find(ad => ad.id === idOfAd);
    if(existedAd) {
        // existe ad
        ads = ads.filter(ad => ad.id !== idOfAd);
        res.status(200).send( "Ad is successfully deleted !")
    } else {
        // not existe ad
        res.status(404).send( "Error can't delete this ad !")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
  