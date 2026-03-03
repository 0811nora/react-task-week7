import { useNavigate } from "react-router-dom";
import { useCallback, useEffect , useState } from "react";
import { delAdmSingleProduct , getAdmProducts } from "../../api/Api";
import ProductModal from "../../components/ProductModal";
import Button from 'react-bootstrap/Button';
import ConfirmModal from "../../components/ConfirmModal";



const AdmProduct = () => {

    const [ productList , setProductList] = useState([]);
    const [ categoryList , setCategoryList] = useState([]);
    const [ isMode , setIsMode] = useState("")
    const [ show, setShow] = useState(false);
    const [ showConfirm, setShowConfirm] = useState(false);
    const [ activeProduct , setActiveProduct] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        console.log("productList",productList);
        console.log(categoryList);
        console.log("activeProduct",activeProduct);
    }, [productList,categoryList,activeProduct])

    const fetchProducts = useCallback(async () => {
        
        try {
            const response = await getAdmProducts();
            const { products } = response.data
            const productArray = Object.values(products);
            setProductList(productArray);
            setCategoryList([...new Set(productArray.map(item => item.category))])
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },[]);

    const handleDelete = async (id) => {
        try{
            const res = await delAdmSingleProduct(id)
            console.log(res.data.message)
            setShowConfirm(false);
            fetchProducts();
            setActiveProduct({})

        }catch(error){
            console.error("Error fetching products:", error);
        }
    }



    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    



    return(<>
        <main className="bg-primary">
            <div className="container py-5">
                <button className="btn btn-primary"
                    onClick={ () =>
                        setTimeout(()=>{
                            navigate('/'); 
                        },500)
                    }
                    ><i className="bi bi-arrow-left me-2"></i>回到客戶端首頁
                </button>

                <h1 className="mb-2 text-center">商品管理</h1>
                <div className="text-end mb-3">
                    <Button variant="dark" className="py-2"
                    onClick={()=> { 
                        setShow(true); 
                        setIsMode("add")
                    }}>
                        <i className="bi bi-plus-circle me-3"></i>新增商品
                    </Button>
                </div>
                <div>
                    <table className="table align-middle text-center">
                        <thead>
                            <tr >
                                <th scope="col" >#</th>
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
                                    <td className="py-3">
                                        <img style={{width:"50px",height:"50px"}} src={product.imageUrl} alt={product.title} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{product.origin_price.toLocaleString()}</td>
                                    <td>{product.price.toLocaleString()}</td>
                                    <td>{product.is_enabled === 1 ? "啟用" : "停用"}</td>
                                    <td>
                                        <Button variant="primary" className="me-2"
                                            onClick={()=> { 
                                                setShow(true); 
                                                setIsMode("edit");
                                                setActiveProduct(product)
                                            }} >編輯
                                        </Button>
                                        <Button variant="danger"  onClick={() => {
                                            setShowConfirm(true);
                                            setActiveProduct(product)}}>
                                            刪除
                                        </Button>
                                        
                                    </td>
                                </tr>
                            )))}
                            
                        </tbody>
                    </table>
                </div>

                

                
            </div>

            
            <ProductModal 
                show={show}
                mode={isMode}
                handleClose={() => setShow(false)}
                categoryData={categoryList}
                productsData={activeProduct}
                handleUpdateList={fetchProducts}
            />

            <ConfirmModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                productsData={activeProduct}
                text={{
                    title:"是否刪除此商品？",
                    bodyText:"您將刪除",
                }}
                handleConfirm={() => handleDelete(activeProduct.id)}
            />
        </main>
        
    </>)
}

export default AdmProduct;