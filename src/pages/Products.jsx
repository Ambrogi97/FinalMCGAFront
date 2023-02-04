import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    }

    getProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <p>Producto: {product.name}</p>
          <p>Precio: {product.price}</p>
        </div>
      ))}
    </div>
  );
};
export default Products;
