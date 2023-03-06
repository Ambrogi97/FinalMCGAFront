import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createProduct } from "../../store/actions/productActions";

const Form = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: ""
    }
  });

  const onSubmit = data => {
    dispatch(createProduct(data));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name", { required: true })} placeholder="Nombre:" />
        {errors?.name && <span>El nombre es requerido</span>}
        <input type="text" {...register("price", { required: true })} placeholder="Precio:" />
        {errors?.price && <span>El precio es requerido</span>}
        <input type="text" {...register("stock", { required: true })} placeholder="Stock:" />
        {errors?.stock && <span>El stock es requerido</span>}
        <input
          type="text"
          {...register("description")}
          placeholder="Descripción:"
        />
        <input
          type="text"
          {...register("image")}
          placeholder="Imagen URL:"
        />
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
};
export default Form;
