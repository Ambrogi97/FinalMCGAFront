import { useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm"
import styles from "./styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
    const { status } = useSelector(state => state.users);

    const navigate = useNavigate();

    useEffect(() => {
        if (status === "succeeded") {
            navigate("/products");
        }
    }, [status, navigate]);

    return (
        <div className={styles.home}>
            <div className={styles.image}>
                <img
                    src="https://startupsmagazine.co.uk/sites/default/files/2020-11/AdobeStock_291895827ed.jpg"
                    alt="hero"
                />
            </div>
            <div className={styles.formulario}>
                <LoginForm />
            </div>
        </div>
    )
}
export default Login