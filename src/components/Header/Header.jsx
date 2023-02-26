import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Header.module.css";

import { logout } from '../../store/slices/user/index.js'

const Header = () => {
  const { status } = useSelector(state => state.users);

  console.log(status);
  const dispatch = useDispatch()

  const isLoggedIn = status === 'succeeded'

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.container}>
      <div>
        <img src="" alt="" />
      </div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          {isLoggedIn ? (<>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>Cerrar sesión</Link>
            </li>
          </>
          ) : (<li>
            <Link to="/login" onClick={handleLogout}>Iniciar sesión</Link>
          </li>)}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
