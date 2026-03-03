import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from 'axios';



const token = document.cookie.split("; ").find((row) => row.startsWith("admToken"))?.split("=")[1];
if(token)axios.defaults.headers.common['Authorization'] = token;



function App() {




  return (<>
  <Toaster position="bottom-left" reverseOrder={false} />
    <div>
      <Header/>
      <div >
        <Outlet />
      </div>
      <Footer/>
    </div>
  </>)
}

export default App
