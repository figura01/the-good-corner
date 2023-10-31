import styles from '@/styles/components/CardAd.module.css';
import Image from 'next/image';
import { ConvertPriceToFrEuro } from '@/utils';
export default function CardAd({title, price, picture, id}: {title: string, price:number, picture:string, id: number})  {
    return <div className={styles["card-ad"]}>
        <h3 className={styles["card-ad_title"]}>{title}</h3>
        <div className={styles["card-ad_inner"]}>
        
            <img className={styles["card-ad_img"]} src={picture} alt={title}/>
        </div>
        
        <div className={styles["card-ad_footer"]}>
            
            <p>{ConvertPriceToFrEuro(price)}</p>
            <button className={styles["card-ad_button-add"]}>Ajouter au pannier</button>
        </div>
    </div>
}