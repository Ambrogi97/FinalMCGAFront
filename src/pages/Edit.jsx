import EditProduct from "../components/EditProduct/EditProduct";
import styles from "./styles/Products.module.css";

const Edit = () => {
  return (
    <div className={styles.formulario}>
      <h1>Editar producto</h1>
      <EditProduct />
    </div>
  );
};
export default Edit;
