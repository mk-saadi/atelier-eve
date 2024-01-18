import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layout/Main";

import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import AuthPage from "./pages/authentication/AuthPage";
import AuthProvider from "./provide/AuthProvider";
import AddProducts from "./dashboard/admin/AddProducts";
import Exp from "./component/hooks/Exp";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { CartProvider } from "./provide/CartProvider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/addProducts",
				element: <AddProducts />,
			},
			{
				path: "/productsDetail/:id",
				element: <ProductDetail />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthPage />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
		],
	},
	{
		path: "/exp",
		element: <Exp />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<div className="flex flex-col min-h-screen bg-[#fff] overflow-x-hidden">
					<RouterProvider router={router} />
				</div>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
