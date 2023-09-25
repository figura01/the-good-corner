import { Repository } from "typeorm";
import { Ad } from "../entities/ad.entity";

export default class AdService {
    db: Repository<Ad>

    constructor() {
        
    }
}