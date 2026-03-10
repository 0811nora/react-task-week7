import App from "../App.jsx";
import { createHashRouter, Navigate } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Product from "../Pages/Product.jsx";
import ProductDetail from "../Pages/ProductDetail.jsx";
import CartPage from "../Pages/Cart.jsx";
import Login from "../Pages/Login.jsx";
import AdmProduct from "../Pages/admin/AdmProduct.jsx";
import OrderConfirm from "../Pages/OrderConfirm.jsx";
import AdmLayout from "../Pages/admin/AdmLayout.jsx";
import ProtectedRoute from "../components/ProtecteRoute.jsx";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "cart", element: <CartPage /> },
			{ path: "product", element: <Product /> },
			{ path: "login", element: <Login /> },
			{ path: "order", element: <OrderConfirm /> },
			{ path: "/product/:id", element: <ProductDetail /> },
		],
	},
	{
		path: "/admin",
		element: ( 
			<ProtectedRoute>
				<AdmLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element:  <Navigate to="product" replace/>,
			},
			{
				path: "product",
				element: <AdmProduct />,
			},
		],
	},
];

const router = createHashRouter(routes);

export default router;
