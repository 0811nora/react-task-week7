import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import axios from "axios";
import { getAllProducts } from "../../api/Api";
import { p } from "framer-motion/client";


const AdmProduct = () => {

    const [ productList , setProductList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(productList);
    }, [productList])

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProductList(response.data.products);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);



    return(<>
        <main className="bg-primary">
            <div className="container py-5">
                <button className="btn btn-primary"
                    onClick={ () =>
                        setTimeout(()=>{
                            navigate('/'); 
                        },500)
                    }
                    >回到客戶端首頁
                </button>

                <h1 className="mb-2 text-center">商品管理</h1>
                <div className="text-end mb-3">
                    <button className="btn btn-dark py-2 px-4">新增商品</button>
                </div>
                <div>
                    <table className="table align-middle text-center">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">商品名稱</th>
                                <th scope="col">分類</th>
                                <th scope="col">商品原價</th>
                                <th scope="col">商品售價</th>
                                <th scope="col">啟用狀態</th>
                                <th scope="col">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((product => (
                                <tr key={product.id}>
                                    <td>
                                        <img style={{width:"50px",height:"50px"}} src={product.imageUrl} alt={product.title} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{product.origin_price}</td>
                                    <td>{product.price}</td>
                                    <td>{product.is_enabled === 1 ? "啟用" : "停用"}</td>
                                    <td><button className="btn btn-primary">查看</button></td>
                                </tr>
                            )))}
                            
                        </tbody>
                    </table>
                </div>
                {/* <div className="text-center">
                    <h1 className="py-5 ">你好 <br />我是商品管理頁</h1>

                    <button className="btn btn-primary"
                        onClick={ () =>
                            setTimeout(()=>{
                                navigate('/'); 
                            },500)
                        }
                        >回到客戶端首頁
                    </button>
                </div> */}
                
            </div>
        </main>
        
    </>)
}

export default AdmProduct;