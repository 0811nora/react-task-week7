import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts, } from "../api/Api";
import Loader from "../components/Loader";


function Product(){

    const [ allProduct , setAllProduct ] = useState([]);
    const [ categoryProduct , setCategoryProduct ] = useState([]);
    const [ targetCategory , setTargetCategory] = useState("全部");
    const [ isLoading , setIsLoading ] = useState(false);

    const categoryList = ["全部","清新果漾","職人花香","法式醇厚","經典茶韻","暖心堅果","東方旬味"];
    
    useEffect(() => {
        const getProductData = async () => {
            setIsLoading(true)
            try{
                const res = await getAllProducts();
                setAllProduct(res.data.products);
                setCategoryProduct(res.data.products);
                setIsLoading(false)
                console.log(res)
                
            }catch(err){
                console.log(err)
            }
        }
        getProductData();
    },[])


    const headleCategory = (value) => {
        setTargetCategory(value);
        if(value === "全部"){
            setCategoryProduct(allProduct);
        }else{
            const data = allProduct.filter((item) => item.category === value);
            setCategoryProduct(data)
        }
    }

    if(isLoading){
        return <div className="loader-overlay">
            <Loader/>
        </div>
}

    return (
        <div className="bg-primary d-flex flex-column" style={{ minHeight: '90vh' }}>
            <div className="bg-primary py-5">
                <div className="container ">
                    <div className="text-center mb-5">
                        {categoryList?.map((item) => (
                            <button key={item} 
                                className={`btn  bottom-b-dark m-2 rounded-0 ${item === targetCategory ? "btn-dark " : " "}`} 
                                onClick={() => headleCategory(item)}>{item}
                            </button>
                        ))}
                    </div>
                    <ProductCard data={categoryProduct}/>
                </div>
            </div>
        </div>
        
    )
    
}

export default Product;