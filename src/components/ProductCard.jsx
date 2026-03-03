import { Link} from "react-router-dom";
import { postAddToCart } from "../api/Api";
import { errorNotify, successNotify } from "./Toast";
import PageTransition from "./PageTransition";





function ProductCard({data}) {


    const postAddCart = async(id , qty = 1) => {

        const data = {
            "product_id": id,
            "qty": qty
        }

        try{
            const res = await postAddToCart(data);
            successNotify(res.data.message)

        }catch(err){
            errorNotify(err.response.data.message[0])

        }
    }




    return(
        <PageTransition>
            <div className="productCard mx-auto" style={{maxWidth:"960px"}}>
                <div className="row row-cols-2">
                    {data?.map((item) => (
                        <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                            
                            <div className="card position-relative mb-5 text-white" >
                                <Link to={`/product/${item.id}`} className="stretched-link"/>
                                <div className="w-100 h-100 p-2">
                                    <img src={item.imageUrl} className="img-fluid w-100 h-100 " alt="..."/>
                                </div>
                                <div className="card-body position-absolute bottom-0 start-0 w-100">
                                    <h5 className="mb-2  me-2">{item.title}</h5>
                                    <span className="mb-2">
                                        {item.tags?.map((i) => (
                                            <span key={i} className="badge bg-dark fw-normal me-1">{i}</span>
                                        ))}
                                    </span>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text fs-4 fw-bolder">${item.price.toLocaleString()}</p>
                                        <div >
                                            <button className="btn btn-dark px-4" onClick={() => postAddCart(item.id)} >
                                                <i className="bi bi-cart-plus-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                            
                            
                        </div>
                    ))}

                </div>
            
                
            </div>
        </PageTransition>
    )
}

export default ProductCard;