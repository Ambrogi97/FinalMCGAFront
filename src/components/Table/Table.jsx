import styles from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeProduct } from "../../store/actions/productActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Table = ({ data }) => {
  const { status } = useSelector(state => state.users);
  const { products } = useSelector(state => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])


  const loggedIn = status === 'succeeded' ? true : false;
  const handleDelete = product => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm(`Seguro que desea borrar el producto: ${product.name}`);

    if (ok) {
      dispatch(removeProduct(product));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Tabla de productos</h1>
      <table className={styles.table}>
        <thead>
          <tr key={'titles'}>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            {loggedIn && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product._id} id={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock} unidades</td>
              <td>{product.description}</td>
              {loggedIn && (
                <td>
                  <button onClick={() => navigate(`/edit/${product._id}`)}>Editar</button>
                  <button onClick={() => handleDelete(product)}>Eliminar</button>
                </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
