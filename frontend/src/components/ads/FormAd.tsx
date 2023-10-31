import {useState, useEffect} from 'react';
import { axiosInstance } from '@/lib/axiosInstance';
import { Category } from '@/types/categories';
import { IAdForm } from '@/types/ads';
import styles from "@/styles/components/FormAd.module.module.css"
import { useRouter } from 'next/router';

export default function FormAd() {  
    const router = useRouter();
    const [categories, setCategories]= useState<Category[]>([]);
    const [formData, setFormData] = useState<IAdForm>({} as IAdForm); // important pour spread formData
    useEffect(() => {
        axiosInstance.get<Category[]>("/categories/list")
        .then(({data}) => {
            console.log(data)
            setCategories(data)
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value);
        let value: number | string | { id: number } = "";
        switch (e.target.name) {
          case "category":
            value = { id: +e.target.value };
            break;
          case "price":
            value = +e.target.value;
            break;
          default:
            value = e.target.value;
        }
        console.log(value);
        setFormData({ ...formData, [e.target.name]: value }); //{...formulaireData, title: valeur}
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        axiosInstance
        .post("/ads/create", formData)
        .then(({ data }) => {
          //si tout se passe bien, rediriger vers la catégorie
          console.log(data)
          router.push(`/categories/view/${data.category?.id}`);
        })
        .catch((err) => console.log(err));
    }

    return <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]} >
            <label htmlFor='title'>Titre</label>
            <input 
                onChange={handleChange}
                type="text" 
                name="title" 
                value={formData.title} 
                placeholder="Un title"/>
        </div>

        <div className={styles["form-group"]} >
            <label htmlFor='owner'>Owner</label>
            <input 
                onChange={handleChange}
                type="text" 
                name="owner" 
                value={formData.owner} 
                placeholder="De"
            />
        </div>

        <div className={styles["form-group"]} >
            <label htmlFor='description'>Description</label>
            <input 
                onChange={handleChange}
                type="text" 
                name="description" 
                value={formData.description} 
                placeholder="Une description"
            />
        </div>

        <div className={styles["form-group"]} >
            <label htmlFor='image'>Image</label>
            <input 
                onChange={handleChange}
                type="text" 
                name="picture"
                value={formData.picture} 
                placeholder="URL Image"
            />
        </div>
        <div className={styles["form-group"]} >
            <label htmlFor='price'>Price</label>
            <input 
                onChange={handleChange}
                type="number" 
                name="price"
                step=".01"
                pattern="[0-9]*"
                value={formData.price}
            />
        </div>

        <div className={styles["form-group"]} >
            <label htmlFor='location'>Location</label>
            <input 
                onChange={handleChange}
                type="string" 
                name="location"
                value={formData.location}
            />
        </div>
        <div className={styles["form-group"]} >
            <select
                onChange={handleChange}
                name="category"
            >
                {categories.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)}
            </select>
        </div>
        <button type="submit">Ajouter l&apos;annonce</button>
    </form>
}  