import { useEffect , useState } from "react";
import PageTransition from "../components/PageTransition";
import { useForm } from 'react-hook-form';
import { getCart , postOrder } from "../api/Api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { errorNotify, successNotify } from "../components/Toast";



const OrderConfirm = () => {

    
    const [ cartAllList , setCartAllList ] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);
    const [ isOrderDone , setIsOrderDone ] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState:{ errors },
    } = useForm();

    const onSubmit = async(data) => {
        setIsLoading(true)

        const userInfo = {
            user: {
                name: data.userName,
                email: data.userEmail,
                tel: data.userTel,
                address: data.userAddress
            },
            message: data.userMessage
        }



        try{
            const res = await postOrder(userInfo)
            successNotify(res.data.message)
            setIsOrderDone(true)
            setIsLoading(false)
        }catch(err){
            errorNotify(err.response.data.message)
        }finally{
            setIsLoading(false)
        }


    }

    



    useEffect(() => {
        const getcart = async () => {
            setIsLoading(true)
            try{
                const res = await getCart();
                setCartAllList(res.data.data.carts)
                setIsOrderDone(false)
            }catch{
                console.log("取得購物車錯誤")
            }finally{
                setIsLoading(false)
            }
        }
        getcart()
    },[])

    const calcTotalPrice = cartAllList.reduce((acc , price) => acc + price.final_total ,0 )


    if(isLoading){
        return <div className="loader-overlay">
            <Loader/>
        </div>
    }

    


    return(<>

        <PageTransition>
            <div className="cartPage">
                <div className="bg-primary d-flex flex-column" style={{ minHeight: '90vh'}}>
                    <div className="container py-5">
                        <div className="mx-auto" >
                            {isOrderDone 
                                ? <h2 className="text-center fw-bolder mb-3">您的訂單已建立</h2>
                                : <h2 className="text-center fw-bolder mb-3">確認您的訂單</h2>
                            }
                            
                            <Link to="/cart" className="btn btn-text-primary fw-bold mb-3">
                                <i class="bi bi-arrow-left me-2"></i>
                                回購物車列表
                            </Link>

                            {isOrderDone 
                                ? <div className="card p-5 text-center fs-4 mx-5 fw-bold "> 
                                <i class="bi bi-check-circle-fill text-success ms-2 fs-1"></i>
                                    <span>訂單完成</span>
                                    歡迎繼續選購
                                    <Link className="fs-5 mt-2" to="/">點我回首頁</Link>
                                </div>
                                : <form className="row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-8">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label for="userName" class="form-label">姓名</label>
                                                        <input type="text" class={`form-control ${errors.userName && 'is-invalid'}`} id="userName"
                                                            {...register("userName" ,{ required: {
                                                                value: true,
                                                                message: '需填寫姓名'
                                                            }})}
                                                        />
                                                        
                                                        {errors.userName && (
                                                            <div className="invalid-feedback">
                                                                {errors.userName.message}
                                                            </div>
                                                        )}    

                                                    </div>
                                                    <div class="col-md-6">
                                                        <label for="userTel" class="form-label">手機號碼</label>
                                                        <input type="tel" class={`form-control ${errors.userTel && 'is-invalid'}`} id="userTel"
                                                            {...register("userTel",{ required: {
                                                                value: true,
                                                                message: '需填寫手機號碼'
                                                            },
                                                            minLength:{
                                                                value:10,
                                                                message: '手機號碼不能少於10碼'
                                                            },
                                                            maxLength:{
                                                                value:10,
                                                                message: '手機號碼不能大於10碼'
                                                            }})}
                                                        />
                                                        {errors.userTel && (
                                                            <div className="invalid-feedback">
                                                                {errors.userTel.message}
                                                            </div>
                                                        )}    
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="userEmail" class="form-label">Email</label>
                                                        <input type="email" class={`form-control ${errors.userEmail && 'is-invalid'}`} id="userEmail"
                                                            {...register("userEmail",{ required: {
                                                                value: true,
                                                                message: '需填寫Email'
                                                            },
                                                            pattern: {
                                                                value: /^\S+@\S+$/i,
                                                                message: '格式不正確'
                                                            }})}
                                                        />
                                                        {errors.userEmail && (
                                                            <div className="invalid-feedback">
                                                                {errors.userEmail.message}
                                                            </div>
                                                        )} 
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="userAddress" class="form-label">地址</label>
                                                        <input type="text" class={`form-control ${errors.userAddress && 'is-invalid'}`} id="userAddress" 
                                                            {...register("userAddress",{ required: {
                                                                value: true,
                                                                message: '需填寫地址'
                                                            }})}
                                                        />
                                                        {errors.userAddress && (
                                                            <div className="invalid-feedback">
                                                                {errors.userAddress.message}
                                                            </div>
                                                        )} 
                                                    </div>
                                                    <div class="col-12">
                                                        <label for="userMessage" class="form-label">留言</label>
                                                        <textarea class="form-control" id="userMessage" rows="3"
                                                            {...register("userMessage")}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card">
                                            <div class="card-body">
                                                <h4 className="mb-3">訂單資訊</h4>
                                                <div>
                                                    <button class="btn btn-text p-0 pb-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        購買明細 <i class="bi bi-caret-down"></i>
                                                    </button>
                                                </div>
                                                
                                                <div class="collapse" id="collapseExample">
                                                    <div class="card card-body">
                                                        {cartAllList.map((item) => (
                                                            <div className="d-flex gap-3 align-items-center mb-2">
                                                                <div>
                                                                    <img style={{width:"50px",heught:"50px"}} src={item.product.imageUrl} alt="" />
                                                                </div>
                                                                <div className="w-100">
                                                                    <p>{item.product.title}</p>
                                                                    <div className="d-flex justify-content-between">
                                                                        <p>x {item.qty}</p>
                                                                        <p>$ {item.final_total}</p>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="my-3 border-top pt-3 d-flex justify-content-between px-1 fs-5 fw-bold">
                                                    <p>總金額</p>
                                                    <p>$ {calcTotalPrice.toLocaleString()}</p>
                                                </div>
                                                <button className="btn btn-dark w-100" type="submit">送出訂單</button>

                                                
                                                
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                
                            }
                            

                        </div>
                        
                    </div>

                </div>
            </div>
        </PageTransition>
    </>)

}

export default OrderConfirm;