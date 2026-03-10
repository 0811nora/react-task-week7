import { useEffect, useState } from "react";
import { userCheck } from "../api/Api";
import axios from "axios";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {

	const [ isAuth , setIsAuth ] = useState(false);
	const [ isLoading , setIsLoading ] = useState(true);

	useEffect(() => {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("admToken="))
			?.split("=")[1];
		if (token) axios.defaults.headers.common["Authorization"] = token;

		const checkUserState = async () =>{
				try{
						const res =  await userCheck();
						console.log(res)
						setIsAuth(true);
				}catch{
						setIsAuth(false);
				}finally{
						setIsLoading(false);
				}
		}
		checkUserState();
	},[])

	if(isLoading){ return <div className="loader-overlay"><Loader/></div>}

	if(!isAuth){ return < Navigate to="/login" replace />}


	return children;	
}

export default ProtectedRoute;
