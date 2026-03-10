import logoImg from '../assets/img/MaCarOn.svg';
import { getCartAsync } from '../slice/cartSlice';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { useEffect } from 'react';

function Header() {
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state.cart)

    useEffect(()=>{
        dispatch(getCartAsync())
    },[dispatch])

    const totalQty = cartList.reduce((acc, item) => acc + item.qty ,0)
    
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
                        <NavLink className="nav-link nav-btn " to='/cart'>
                        <div className='position-relative'>
                            <i className="bi bi-cart-fill position-relative px-1" style={{fontSize:"24px" }} ></i>
                            {totalQty > 0 && 
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalQty}
                                </span>
                            }
                            
                        </div>
                        </NavLink>
                    </li>
                    <li className="nav-item  text-center">
                        <NavLink className="nav-link  nav-btn text-dark  fw-bolder w-100 px-2" to='/admin'>
                            前往後台
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default Header;