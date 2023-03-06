import styles from "./ProductGallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import { useEffect } from "react";

const ProductGallery = () => {
    const { products, status } = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status])

    console.log(products);

    return (
        <div className={styles.container}>
            <h1>Tabla de productos</h1>
            {/* Product gallery  */}
            <div className={styles.productGallery}>
                {products?.map(product => (
                    <div className={styles.product} key={product._id}>
                        <div className={styles.productImage}>
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className={styles.productInfo}>
                            <h3>{product.name}</h3>
                            <p className={styles.description}>{product.description}</p>
                            <p>${product.price}</p>
                            <p>{product.stock} unidades</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductGallery;
