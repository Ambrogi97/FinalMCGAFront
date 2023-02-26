import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/user'
const LoginForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = data => {
        const { email, password } = data
        dispatch(login(email, password))
    }

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" {...register("email", { required: true })} />
                {errors?.email && <p>El email es requerido</p>}
                <input type="password" placeholder="Password" {...register("password", { required: true })} />
                {errors?.password && <p>El password es requerido</p>}
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}
export default LoginForm