import { ConvertPriceToFrEuro } from "@/utils";
import { Ad } from "@/types/ads";
import styles from "@/styles/components/CardAdDetail.module.css";

export default function CardAdDetail({id, title, description, owner, price, location, picture, createdAt}: Ad) {
    return <div className={styles["card-ad-detail"]}>
        <div className={styles["card-ad-detail_left"]}>
            <h3 className={styles["card-ad-detail_title"]}>{title}</h3>
            <img src={picture} alt={`${owner} ${title}`}/>
            <p>Prix: {ConvertPriceToFrEuro(price)}</p>
        </div>
        <div className={styles["card-ad-detail_right"]}>
            <h4 className={styles["card-ad-detail_description"]}>Description: </h4>
            <p>{description}</p>
            <div className={styles["card-ad-detail_footer"]}>
                <span>De: {owner}</span>
                <span>Publiée le: {new Date(createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
            <button>
                Ajouter au pannier
            </button>
            
        </div>
    </div>
}