import React from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ButtonPublishAd.module.css';

const ButtonPublishAd = () => {
  return (
    <div className={styles.button_link}>
        <Link href="/ads/create">
            Publier une annonce
        </Link>
    </div>
  )
}

export default ButtonPublishAd