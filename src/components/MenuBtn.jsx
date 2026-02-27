import { NavLink } from "react-router-dom";

function MenuBtn() {
    return (
        <div className="containerA">
            <div className="menuButton type--B btn-shake ">
                <div className="menuButton__line"></div>
                <div className="menuButton__line"></div>
                <span className="menuButton__text fs-4">
                    <NavLink className="nav-link"  to='/product'>前往挑選</NavLink>
                </span>
                <div className="menuButton__drow1"></div>
                <div className="menuButton__drow2"></div>
            </div>
        </div>
    )  
}
export default MenuBtn;