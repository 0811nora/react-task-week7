import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm ,useWatch } from "react-hook-form"
import { useImageUpload } from '../hook/useImageUpload';
import { useEffect } from 'react';
import { postAdmNewProduct , putAdmSingleProduct } from '../api/Api';

const REACT_DATA = {
    category: "職人花香",
    content: "",
    description: "",
    imageUrl: "",
    is_enabled: "1",
    origin_price: "",
    price: "",
    title: "",
    tags:[]
}

function ProductModal({ 
    show, 
    handleClose,
    categoryData,
    productsData,
    mode,
    handleUpdateList,
}) {
    const {
        register, 
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors }, 
    } = useForm({
        defaultValues:{REACT_DATA}
    });

    const modeConfig = {
        add: {
            title: "新增商品",
            submitBtn:"確認新增"
        },
        edit: {
            title: "編輯商品",
            submitBtn:"確認編輯"
        }
    }

    const { isUploading , handleFileChange } = useImageUpload((url) => {
        setValue("imageUrl",url);
    })

    const tempImageUrl = useWatch({
        control,
        name: "imageUrl",
    });

    const onSubmit = async(data) => {
        const finalData = {
            ...data,
            unit: "個",
            tags: typeof data.tags === 'string' 
            ? data.tags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag !== "") 
            : data.tags
        }
        console.log(finalData);

        try{
            if(mode === "add"){
                const res = await postAdmNewProduct(finalData);
                handleClose();
                handleUpdateList();
                console.log(res);
            }else{
                const res = await putAdmSingleProduct(productsData.id,finalData);
                handleClose();
                handleUpdateList();
                console.log(res)
            }
        } catch (error) {
            console.error("Error submitting product:", error);
        }
        
    }


    useEffect(() => {
        if(show){
            reset( mode === "add" ? REACT_DATA : productsData);
        }
    },[show, mode, productsData ,reset])

    
    


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header size="lg" closeButton>
            <Modal.Title className="text-center w-100">
                {modeConfig[mode]?.title}
            </Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">商品名稱</label>
                        <input className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        {...register("title" , {required: true,}) }/>
                        <span className='text-danger'>{errors.title && "商品名稱為必填"}</span>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">商品類別</label>
                        <select {...register("category")} className="form-select" >
                            {categoryData.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="tags" className="form-label">商品標籤 (請用逗號隔開)</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.tags ? "is-invalid" : ""}`}
                            placeholder="例如：熱銷, 新品, 限時優惠"
                            {...register("tags")} 
                        />
                        <span className='text-danger'>{errors.tags && "至少填寫一個標籤"}</span>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="origin_price" className="form-label">原價</label>
                        <input type="number" className={`form-control ${errors.origin_price ? "is-invalid" : ""}`} min="0"
                            {...register("origin_price" , {
                                required: true,
                                valueAsNumber: true
                            })} 
                        />
                        <span className='text-danger'>{errors.origin_price && "原價為必填"}</span>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">售價</label>
                        <input type="number" className={`form-control ${errors.price ? "is-invalid" : ""}`}  min="0"
                        {...register("price",{
                            required: true, 
                            valueAsNumber: true
                        })} />
                        <span className='text-danger'>{errors.price && "售價為必填"}</span>
                    </div>
                    <div className="col-md-6 mb-3">
                        <span className='me-3'>狀態</span>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" {...register("is_enabled",{valueAsNumber: true})} value={1} defaultChecked/>
                            <label className="form-check-label" htmlFor="on">啟用</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" {...register("is_enabled",{valueAsNumber: true})} value={2}/>
                            <label className="form-check-label" htmlFor="off">停用</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">商品描述</label>
                        <textarea className="form-control" {...register("description")} rows="2"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">商品說明</label>
                        <textarea className="form-control" {...register("content")} rows="2"></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">商品圖片</label>
                        
                        <input 
                            id="imageUrl"
                            className="form-control mb-2" 
                            placeholder="請輸入圖片連結，也可以上傳圖片"
                            {...register("imageUrl")}
                        />

                        <div className="d-grid gap-2">
                            <input 
                                type="file" 
                                id="uploadBtn" 
                                className="d-none" 
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                            
                            <label htmlFor="uploadBtn" className="btn btn-primary">
                                <i className="bi bi-upload me-2"></i>
                                {isUploading ? '上傳中...' : '上傳圖片'}
                            </label>
                        </div>

                        <div className="mt-3">
                            {tempImageUrl  && 
                            <div className='text-center'>
                                <img src={tempImageUrl } alt="預覽" style={{width:"300px",height:"200px"}}/>
                            </div>
                            }
                        </div>
                    </div>
                    


                    <div className='d-flex w-100 justify-content-center gap-4'>
                        <Button variant="secondary" onClick={handleClose}>
                            取消
                        </Button>
                        <Button variant="primary" type="submit" >
                            {modeConfig[mode]?.submitBtn}
                        </Button>
                    </div>
                </form>


            </Modal.Body>
        </Modal>
    );
}

export default ProductModal;