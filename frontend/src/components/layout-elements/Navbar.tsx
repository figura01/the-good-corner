import {useState, useEffect} from 'react';
import Link from 'next/link';

import styles from '../../styles/components/Navbar.module.css';
const Navbar = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState([
        {
            id:1,
            name: 'Voitures'
        },
        {
            id:2,
            name: 'Vêtements'
        },
        {
            id:3,
            name: 'Chaussures'
        },
        {
            id:4,
            name: 'Meubles'
        },
        {
            id:5,
            name: 'Autres'
        },
    ])
    useEffect(() => {
        fetch('http://localhost:4000/categories/list')
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            if(data) return setCategories(data)
            setCategories([]);
        })
        .catch((error) => {
            console.log(error)
            setError(error.message)
        })
        .finally(() => {
            setIsLoading(false)
        })    
    }, [])
    return <nav className={styles.nav}>
        <ul className={styles["nav-list"]}>
        {isLoading && categories && categories.map((c) => (
            <Link key={`nav_link_${c.id}`} className={styles["nav-link"]} href={`/categories/view/${c.id}`}>
                {c.name}
            </Link>
        ))}
        </ul>
    </nav>
}

export default Navbar;