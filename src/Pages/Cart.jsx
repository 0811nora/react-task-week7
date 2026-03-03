import { useCallback, useEffect, useMemo, useState } from "react";
import { getCart ,deleteCartItem, putCartItem } from "../api/Api";
import { errorNotify, successNotify } from "../components/Toast";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";
import { useNavigate } from "react-router-dom";


function CartPage(){

    const [ cartAllList , setCartAllList ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);
    const navigate = useNavigate();


    const getcart = useCallback(async () => {
        setIsLoading(true)
        try{
            const res = await getCart();
            setCartAllList(res.data.data.carts)
        }catch{
            console.log("取得購物車錯誤")
        }finally{
            setIsLoading(false)
        }
    },[])

    const totalPrice = useMemo(() => {
        return cartAllList.reduce((a,b) => a + b.final_total,0)
    },[cartAllList])

    const totalAmount = useMemo(()=>{
        return cartAllList.reduce((a,b) =>  a + b.qty ,0)
    },[cartAllList])

    

    useEffect(() => {
        getcart();
    },[getcart])


    const emptyCart = () => {
        if(cartAllList.length === 0){
            errorNotify("請先加入商品")
            return
        }else{
            navigate("/order")
        }
    }
    

    const delCartItem = async(id) => {
        
        try{
            const res = await deleteCartItem(id);
            getcart();
            successNotify(res.data.message)
        }catch(err){
            errorNotify(err.response.data.message)
        }
    }


    const editQty = async(cartId,num,price,total,porductId,type) => {

        const newQty = type ? num + 1 : num -1
        const newtotal = type ? total + price : total - price

        if( newQty <= 0 ){
            delCartItem(cartId)
            return;
        }

        setCartAllList((pre) => (
            pre.map((item) => item.id === cartId
                ? {...item, qty: newQty , total:newtotal , final_total:newtotal}
                : item
            )
        ))
        
        const data = {
            "product_id": porductId,
            "qty": newQty
        }

        try{
            await putCartItem(cartId,data);
            getcart();
            successNotify("已更新數量");
        }catch(err){
            errorNotify(err.response?.data?.message || "更新失敗");
        }
    }


    if(isLoading){
        return <div className="loader-overlay">
            <Loader/>
        </div>
    }

    



    return(
        <PageTransition>
            <div className="cartPage">
                <div className="bg-primary d-flex flex-column" style={{ minHeight: '90vh'}}>
                    <div className="container py-5">
                        <div className="mx-auto" >
                            <h2 className="text-center fw-bolder">即將屬於你的時刻</h2>

                            <div className="my-5">
                                <div className="row ">
                                    <div className="col-8">
                                        <table className="table mx-auto  align-middle table-hover" >
                                            <thead className="bg-dark ">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">商品</th>
                                                    <th scope="col" className="text-center" >數量</th>
                                                    <th scope="col" className="text-center" >價格</th>
                                                    <th scope="col" className="text-center" >總計</th>
                                                    
                                                </tr>
                                            </thead>
                                            {cartAllList.length === 0
                                                ? <tbody>
                                                    <tr>
                                                        <td colSpan="5" className="text-center fs-4" style={{padding:"90px 0"}}>購物車沒有商品，趕快去購買吧!</td>
                                                    </tr>
                                                    
                                                    </tbody>
                                                : <tbody>
                                                    {cartAllList.map((item) => (
                                                        <tr key={item.id}>
                                                            <td className="pe-0">
                                                                <button className="btn btn-text" onClick={()=> delCartItem(item.id)}>
                                                                    <i className="bi bi-x-circle text-primary"></i>
                                                                </button>
                                                            </td>
                                                            <td scope="row ">
                                                                <span>
                                                                    <img style={{width:"50px",height:"50px"}} src={item.product.imageUrl} alt="" />
                                                                </span>
                                                                <span className="ms-3">{item.product.title}</span>
                                                            </td>
                                                            <td className="text-center countBtn">
                                                                <button className="btn" onClick={()=>editQty(item.id,item.qty,item.product.price,item.total,item.product.id,0)}>
                                                                    <i className="bi bi-dash text-white"></i>
                                                                </button>
                                                                <span className="px-3">{item.qty}</span>
                                                                <button className="btn" onClick={()=>editQty(item.id,item.qty,item.product.price,item.total,item.product.id,1)}>
                                                                    <i className="bi bi-plus-lg text-white"></i>
                                                                </button>

                                                                
                                                            </td>
                                                            <td className="text-center">$ {item.product.price.toLocaleString()}</td>
                                                            <td className="text-center">$ {item.total.toLocaleString()}</td>
                                                            
                                                        </tr>
                                                    ))}
                                                
                                            </tbody>
                                            }
                                            
                                        </table>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-white">
                                            <h4 className="bg-dark text-primary px-4 " style={{padding:"12px"}}>總計</h4>
                                            <div className="px-4 py-4 fs-5">
                                                <div className="d-flex justify-content-between py-3">
                                                    <p>總數量<span style={{fontSize:"13px"}}>/ 顆</span></p>
                                                    <p>{totalAmount}</p>
                                                </div>
                                                <div className="d-flex justify-content-between py-3">
                                                    <p>總計金額</p>
                                                    <p className="fw-bold">$ {totalPrice.toLocaleString()}</p>
                                                </div>
                                                <button className="btn btn-dark w-100 mt-3 text-primary" onClick={emptyCart}>前往結帳</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        </PageTransition>
    )
}

export default CartPage;