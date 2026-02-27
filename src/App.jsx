import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";






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
