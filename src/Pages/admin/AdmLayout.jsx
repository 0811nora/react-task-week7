import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MessageToast from "../../components/MessageToast";
import { userLogout } from "../../api/Api"

function AdmLayout() {
	const navigate = useNavigate();

	const handleLogout = async() => {
		try{
			const res  = await userLogout();
			console.log(res)
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div>
			<MessageToast />
			<div className="d-flex p-3 bg-dark text-white">
				<ul className="nav ">
					<li className="nav-item">
						<Link className="nav-link active " aria-current="page" to="/admin/product">商品管理</Link>
					</li>
					
				</ul>
				<div className="ms-auto d-flex gap-4">
					<button className="btn btn-dark" 
						onClick={() =>
							setTimeout(() => {
								navigate("/");
							}, 500)
						}>回首頁</button>
					<button className="btn btn-dark" onClick={handleLogout}>登出</button>
				</div>
			</div>
			

			<Outlet/>
		</div>
	);
}

export default AdmLayout;
