import Link from "next/link"
import styles from "@/styles/components/categories/CardCatgegory.module.css";

export default function CardCategory({id, name} : {id: number, name: string}) {
    return <div className={styles["card-category"]}>
        <Link href={`/categories/view/${id}`} className={styles["card-category_link"]}>
            {name}
        </Link>
    </div>
}