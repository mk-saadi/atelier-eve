import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useScrollToTop from "../../component/hooks/useScrollToTop";

import ProductCategory from "./productDetailComponent/ProductCategory";
import FirstCol from "./productDetailComponent/FirstCol";
import SecondCol from "./productDetailComponent/SecondCol";
import Comment from "./productDetailComponent/Comment";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);

	useScrollToTop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`http://localhost:2000/products/${id}`);
				setProduct(res.data);
			} catch (error) {
				console.error("Error fetching product data:", error.message);
			}
		};
		fetchData();
	}, [id]);

	return (
		<div className="flex flex-col min-h-screen mx-auto mt-6 lg:max-w-4xl xl:max-w-5xl">
			<div className="grid grid-cols-1 overflow-x-hidden lg:grid-cols-7 lg:gap-x-2 gap-y-4 lg:gap-y-0">
				{/* 1st col */}
				<div className="col-span-5">
					<FirstCol product={product} />
				</div>

				{/* 2nd col span */}
				<div className="col-span-2 mx-4 mt-8 lg:mx-0 md:mx-4">
					<SecondCol product={product} />
				</div>
			</div>

			{/* comment section */}
			<div className="py-16 bg-red-400/30">
				<Comment id={id} />
			</div>

			<div>
				<p>Products related to this item</p>
				<ProductCategory genderCategory={product?.genderCat} />
			</div>
		</div>
	);
};

export default ProductDetail;
