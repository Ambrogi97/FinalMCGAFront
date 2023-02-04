import styles from "./Table.module.css";
import { useDispatch } from "react-redux";
import { removeProduct, editProduct } from "../../store/slices/products";

const Table = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = product => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm(`Seguro que desea borrar el producto: ${product.name}`);

    if (ok) {
      dispatch(removeProduct(product));
    }
  };

  const handleEdit = product => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm(`Editando el producto: ${product.name}`);
    // if (ok) {
    //   dispatch(editProduct(product._id));
    // }
  };

  return (
    <div className={styles.container}>
      <h1>Tabla de productos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(product => (
            <tr key={product._id} id={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock} unidades</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
