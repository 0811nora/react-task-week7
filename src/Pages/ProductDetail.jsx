import { useNavigate,  useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { getAllProducts , postAddToCart } from "../api/Api";
import { useDispatch } from "react-redux";
import { getCartAsync } from "../slice/cartSlice";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import useMessage from "../hook/useMessage";

function ProductDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [ allProduct , setAllProduct ] = useState([]);
    const [ num , setNum ] = useState(1);
    const [ recommendData , setRecommendData ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);
    const [ prevId , setPrevId ] = useState(id);
    const { showSuccess , showError } = useMessage();

    const  randomProducts = (products) => {
        return [...products]
            .sort(() => Math.random() - 0.5)
            .slice(0, 8);
    }

    useEffect(() => {
        const getProductData = async () => {
            setIsLoading(true);
            
            try{
                const res = await getAllProducts();
                setAllProduct(res.data.products);
                setRecommendData(randomProducts(res.data.products));
                setIsLoading(false);
            }catch(err){
                console.log(err)
            }
        }
        getProductData();
    },[])

    
    const targetData = allProduct.find((item) =>item.id === id);

    if(isLoading){
        return <div className="loader-overlay">
            <Loader/>
        </div>
    }

    const postAddCart = async(id , num) => {
        const data = {
            "product_id": id,
            "qty": num
        }
        try{
            const res = await postAddToCart(data);
            dispatch(getCartAsync())
            showSuccess(res.data.message);

        }catch(err){
            showError(err.response.data.message[0])
        }
    }

    if( id !== prevId ){
        setPrevId(id);
        setNum(1);
        window.scrollTo(0, 0);
    }



    return(<>
        <PageTransition>
            <main className="productDetail bg-primary " style={{ minHeight: '90vh' }}>
                <div className="container py-5">
                    <div className="mb-5">
                        <button onClick={() => navigate("/product")} className="btn btn-text  drakBtn">
                            <i className="bi bi-arrow-left"></i> 馬卡龍列表
                        </button>
                    </div>
                    <div className="mx-auto mb-5" style={{maxWidth:"960px"}}>
                        <div className="bg-dark p-3">
                            <div className="row">
                                <div className="col-7 p-4 d-flex flex-column">
                                    <div className="text-white ">
                                        <h2 className="mb-3 fs-1">{targetData?.title}</h2>
                                        <div className="mb-3">
                                            {Array.isArray(targetData?.tags) && targetData.tags.map((i) => (
                                                <span key={i} className="badge bg-primary me-2 text-dark">
                                                    {i}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="fs-1 mb-2 fw-bolder">$ {targetData?.price}</p>
                                        <p>{targetData?.content}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <div className="countBtn">
                                            <button onClick={() => setNum( num <= 1 ? 1 : num-1)}><i className="bi bi-dash"></i></button>
                                            <span className="fs-5 fw-bolder text-white px-4" value={num}>{num}</span>
                                            <button onClick={() => setNum(num +1)}><i className="bi bi-plus-lg"></i></button>
                                        </div>
                                        <div className="">
                                            <button className="btn btn-primary px-4  rounded-0 addCartBtn"
                                                onClick={()=>postAddCart(targetData.id,num)}>
                                                <i className="bi bi-plus-lg me-2"></i>購物車
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="bg-dark">
                                        <img src={targetData?.imageUrl} alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                    </div>

                    <div className="py-5">
                        <h2 className="text-center fw-bolder mb-5">熱門推薦</h2>
                        <div className="mx-auto" style={{maxWidth:"960px"}}>
                            <ProductCard data={recommendData}/>
                        </div>
                    </div>
                </div>

            </main>
        </PageTransition>
    </>)
}

export default ProductDetail;