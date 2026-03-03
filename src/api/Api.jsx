import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export { apiUrl, apiPath };



// ********** [ 管理者 ] **********

//登入API
export const postSignin = (data) =>{
    return axios.post(`${apiUrl}/admin/signin`,data);
}

// 驗證登入狀態
export const userCheck = () =>{
    return axios.post(`${apiUrl}/api/user/check`,{});
}

// 登出
export const userLogout = () =>{
    return axios.post(`${apiUrl}/logout`,{});
}



// ********** [ 產品管理 ] **********

// [GET] - 取得所有產品列表
export const getAdmProducts = () =>{
    return axios.get(`${apiUrl}/api/${apiPath}/admin/products/all`);
};


// [GET] - 取得單一類別產品列表
export const getAdmProductsCategory = (category, page = 1) => {
    return axios.get(`${apiUrl}/api/${apiPath}/admin/products`, {
        params: {
            category, 
            page,    
        }
    });
};

// [POST] - 新增單一產品
export const postAdmNewProduct = (content) =>{
    return axios.post(`${apiUrl}/api/${apiPath}/admin/product`, {
        data: content
    });
};

// [PUT] - 修改單一產品
export const putAdmSingleProduct = (id,content) =>{
    return axios.put(`${apiUrl}/api/${apiPath}/admin/product/${id}`, {
        data: content
    });
};

// [DELETE] - 刪除單一產品
export const delAdmSingleProduct = (id) =>{
    return axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${id}`);
};







// ********** [ 產品 ] **********


// [GET] - 取得所有產品列表
export const getAllProducts = () => {
    return axios.get(`${apiUrl}/api/${apiPath}/products/all`);
};


// [GET] - 取得產品列表 (分頁 or 分類）
export const getProducts = (page = 1, category = "") => {
    return axios.get(`${apiUrl}/api/${apiPath}/products`, {
        params: { 
            page,
            category 
        }
    });
};


// [GET] - 取得單一產品細節
export const getSingleProduct = (id) => {
    return axios.get(`${apiUrl}/api/${apiPath}/product/${id}`);
};




// ********** [ 上傳圖片 ] **********
export const upload = (content) =>{
    return axios.post(`${apiUrl}/api/${apiPath}/admin/upload`, content);
};




// ********** [ 購物車 ] **********


// [GET] - 取得購物車列表
export const getCart = () => {
    return axios.get(`${apiUrl}/api/${apiPath}/cart`);
};

// [POST] - 加入購物車
export const postAddToCart = (data) => {
    return axios.post(`${apiUrl}/api/${apiPath}/cart`, {
        data: data
    });
};

// [PUT] - 修改購物車產品 
export const putCartItem = (id, data) => {
    return axios.put(`${apiUrl}/api/${apiPath}/cart/${id}`, {
        data: data
    });
};

// [DELETE] - 刪除購物車單一項目
export const deleteCartItem = (id) => {
    return axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`);
};

// [DELETE] - 刪除全部購物車清單
export const deleteAllCart = () => {
    return axios.delete(`${apiUrl}/api/${apiPath}/carts`);
};







// ********** [ 優惠券 ] **********

// [POST] - 套用優惠券
export const postCoupon = (code) => {
    return axios.post(`${apiUrl}/api/${apiPath}/coupon`, {
        data: { code }
    });
};






// ********** [ 結帳 ] **********


// [POST] - 送出訂單
export const postOrder = (data) => {
    return axios.post(`${apiUrl}/api/${apiPath}/order`, {
        data: data
    });
};

// [GET] - 取得所有訂單
export const getOrders = (page = 1) => {
    return axios.get(`${apiUrl}/api/${apiPath}/orders`, {
        params: { page }
    });
};

// [GET] - 取得單一訂單
export const getOrder = (orderId) => {
    return axios.get(`${apiUrl}/api/${apiPath}/order/${orderId}`);
};





// ********** [ 付款 ] **********

// [POST] - 確認付款
export const postPay = (orderId) => {
    return axios.post(`${apiUrl}/api/${apiPath}/pay/${orderId}`);
};




