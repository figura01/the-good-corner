import React from 'react';
import { TbSearch } from 'react-icons/tb';
import styles from '../../styles/components/SearchBar.module.css';

const Searchbar = () => {
  return (
    <div className={styles.searchbar}>
        <input type="search" className={styles["input-text"]} />
        <button className={styles.button_search}>
            <TbSearch />
        </button>
    </div>
  )
}

export default Searchbar