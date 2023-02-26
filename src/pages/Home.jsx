import styles from "./styles/Home.module.css";
import ProductGallery from "../components/ProductGallery/ProductGallery";

const Home = () => {

  return (
    <div className={styles.home}>

      <ProductGallery />

    </div>
  );
};
export default Home;
