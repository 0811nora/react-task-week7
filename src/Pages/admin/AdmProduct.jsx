import { useNavigate } from "react-router-dom";


const AdmProduct = () => {
    const navigate = useNavigate();

    return(<>
    <div className="container">
        <div className="text-center">
            <h1 className="py-5 ">你好 <br />我是商品管理頁</h1>

            <button className="btn btn-primary"
                onClick={ () =>
                    setTimeout(()=>{
                        navigate('/'); 
                    },500)
                }
                >回到客戶端首頁
            </button>
        </div>
        
    </div>
        
    </>)
}

export default AdmProduct;