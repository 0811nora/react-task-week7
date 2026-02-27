import logoImg from '../assets/img/MaCarOn.svg';
import { NavLink } from 'react-router-dom';





function Header() {

    const token = document.cookie.split("; ").find((row) => row.startsWith("admToken="))?.split("=")[1];

    return (
        <nav className="navbar  bg-primary   position-sticky top-0 w-100 z-3" style={{
            boxShadow:"2px 5px 12px #29292934"
        }}>
            <div className="container d-flex align-items-center justify-content-between">
                
                <div>
                    <NavLink className="nav-link p-0" to='/'>
                        <img src={logoImg} alt="logo" />
                    </NavLink>
                </div>

                <ul className="navbar-nav m-0 d-flex  flex-row align-items-center gap-3">
                    <li className="nav-item ">
                        <NavLink className="nav-link  nav-btn text-dark  fw-bolder w-100 px-2" style={{fontSize:"18px" }}  to='/product'>賞味清單</NavLink>
                    </li>
                    <li className="nav-item  text-center">
                        <NavLink className="nav-link nav-btn" to='/cart'>
                            <i className="bi bi-cart-fill position-relative px-1" style={{fontSize:"24px" }} ></i>
                        </NavLink>
                    </li>
                    <li className="nav-item  text-center">
                        <NavLink className="nav-link  nav-btn text-dark  fw-bolder w-100 px-2" to={token ? '/admin' : '/login'}  >
                            {token ? "你是管理者" : "登入"}
                        </NavLink>
                    </li>
                </ul>
                

            </div>
        </nav>
    );
}


export default Header;