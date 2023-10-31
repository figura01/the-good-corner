import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Ad } from "@/types/ads";
import CardAdDetail from "@/components/ads/CardAdDetail";

function ViewAd() {
  const router = useRouter();
  const [ad, setAd] = useState<Ad>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    // getAds();
    if (router.query.id) {
        axiosInstance
        .get<Ad>(`/ads/find/${router.query.id}`)
        .then(({ data }) => {
          console.log(data);
          setAd(data)
        })
        .catch((err) =>{
          console.log(err)
          setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        });
    }
  }, [router.query.id]);

  return (
    <div>
        <div>Visualisation de l annonce ayant l&apos; id : {router.query.id}</div>
        {!isLoading && ad && (
            <CardAdDetail {...ad}/>
        )}
    </div>
  );
}
ViewAd.title = "Détail annoonce";
export default ViewAd;