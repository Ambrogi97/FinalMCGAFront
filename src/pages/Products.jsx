import { useEffect } from "react";
import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import styles from "./styles/Products.module.css";
import { fetchProducts } from "../store/actions/productActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products } = useSelector(state => state.products);
  const { status } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchProducts());
    } else {
      navigate("/");
    }

  }, [dispatch, navigate, status]);

  return (
    <div className={styles.container}>
      <div className={styles.formulario}>
        <h1>Crear Producto</h1>
        <Form />
      </div>
      <Table data={products} />
    </div>
  );
};
export default Products;
