import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Header.module.css";

import { logout } from '../../store/slices/userSlice'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../store/actions/userActions";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, user } = useSelector(state => state.users);
  const isLoggedIn = status === 'succeeded'

  useEffect(() => {
    if (!isLoggedIn) {
      const token = JSON.parse(localStorage.getItem('token'))
      if (token) {
        dispatch(getUser(token))
        navigate('/products')
      }
    }

  }, [navigate, isLoggedIn, dispatch])


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
              <span style={{ marginRight: '10px', borderRight: '2px solid #000' }}></span>
              <span>
                Hola, {user.name}
              </span>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#ff000033', borderRadius: '10px', marginLeft: '10px' }}>Cerrar sesión</Link>
            </li>
          </>
          ) : (<li>
            <Link to="/login">Iniciar sesión</Link>
          </li>)}
        </ul>
      </nav>
    </div>
  );
};
export default Header;
