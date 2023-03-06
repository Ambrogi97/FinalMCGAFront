import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editProduct } from "../../store/actions/productActions";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products);
  const { status } = useSelector(state => state.users);
  const { id } = useParams();
  const product = products.find(product => product._id === id);
  const { name, price, stock, description, image } = product;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name,
      price,
      stock,
      description,
      image
    }
  });

  useEffect(() => {
    if (status === "succeeded") {
      reset();
    } else {
      navigate("/");
    }

  }, [product, id, reset, navigate, status]);

  const onSubmit = data => {
    const newData = { ...data, _id: id };
    dispatch(editProduct(newData));
    reset();
    navigate("/products");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" {...register("name", { required: true })} placeholder="Nombre:" />
        {errors?.name && <p>El nombre es requerido</p>}
        <input type="text" {...register("price", { required: true })} placeholder="Precio:" />
        {errors?.price && <span>El precio es requerido</span>}
        <input type="text" {...register("stock", { required: true })} placeholder="Stock:" />
        {errors?.stock && <span>El stock es requerido</span>}
        <input
          type="text"
          {...register("description")}
          placeholder="Descripción:"
        />
        {errors?.description && <span>La descripción es requerida</span>}
        <input
          type="text"
          {...register("image")}
          placeholder="Image URL:"
        />
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
};
export default EditProduct;
