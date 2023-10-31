import axios from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IAd } from "@/types";

import CardAd from "@/components/ads/CardAd";
import styles from '@/styles/components/CardAd.module.css';

function ViewCategory() {
  const router = useRouter();
  const [ads, setAds] = useState<IAd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("");
  useEffect(() => {
    // getAds();
    if (router.query.id) {
      axiosInstance
        .get(`/ads/listbycategory/${router.query.id}`)
        .then(({ data }) => {
          console.log(data);
          setAds(data)
          
        })
        .catch((err) =>{
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        });
    }
  }, [router.query.id]);

  return <div>
    <div>Visualisation de la catégorie ayant l&apos; id : {router.query.id}</div>
      <div className={styles.container_cards_ads}>
        {!isLoading && ads && ads.map((ad) => (
          <CardAd key={`card_ad_${ad.id}`} id={ad.id} title={ad.title} price={ad.price} picture={ad.picture} />
        ))}
        
      </div>
    </div>;
}
ViewCategory.title = "Détail catégorie";
export default ViewCategory;