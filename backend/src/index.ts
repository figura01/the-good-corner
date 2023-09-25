import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import db from "./db";
import { Ad } from "./entities/ad.entity";
import { Category } from "./entities/category.entity";
import { Tag } from "./entities/tag.entity";
import { In, Like } from "typeorm";
import categoryRouter from './routes/categories.routes';
import tagRouter from './routes/tags.routes';
import adRouter from './routes/ads.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter);
app.use("/ads", adRouter);



app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});
