import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import MessageToast from "./components/MessageToast";

const token = document.cookie
	.split("; ")
	.find((row) => row.startsWith("admToken"))
	?.split("=")[1];
if (token) axios.defaults.headers.common["Authorization"] = token;

function App() {
	return (
		<>
			<div>
				<MessageToast />
				<Header />
				<div>
					<Outlet />
				</div>
				<Footer />
			</div>
		</>
	);
}

export default App;
