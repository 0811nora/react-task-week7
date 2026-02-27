import logoImgW from '../assets/img/MaCarOn-w.svg';
import { NavLink } from 'react-router-dom';

function Footer() {
    return(
        <div className="bg-dark py-5">
            <div className='text-center'>
                <NavLink className="nav-link p-0" to='/'>
                    <img src={logoImgW} alt="logo" />
                </NavLink>
            </div>
        </div>
    )

}

export default Footer;