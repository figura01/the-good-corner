import { Category } from "@/types/categories";
import { useEffect, useState } from "react";
import CardCategory from "@/components/categories/CardCategory";

import styles from "@/styles/pages/categories/Categories.module.css";

function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        fetch("http://localhost:4000/categories/list")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data) setCategories(data)
        })
        .catch((error) => {
            console.log(error)
        
        });
    }, []);
    return <div>
        <h2>Liste des catégories</h2>
        <ul className={styles['card-category_list']}>
            {categories && categories.map((cat) => <CardCategory key={`category_${cat.id}`} {...cat} />)}
        </ul>
    </div>;
}

// Categories.getLayout = function getLayout(page: any) {
//   return (
//     <div>
//       <h1>Liste</h1>
//       <nav>Navbar</nav>
//       {page}
//       <footer>Footer</footer>
//     </div>
//   );
// };
export default Categories;