import Logo from "./Logo";
import Searchbar from "./Searchbar";
import ButtonPublishAd from "./ButtonPublishAd";
import styles from '../../styles/components/Topbar.module.css';

const Topbar = () => {
    return <div className={styles.topbar}>
        <Logo />
        <Searchbar />
        <ButtonPublishAd />
    </div>
}

export default Topbar;