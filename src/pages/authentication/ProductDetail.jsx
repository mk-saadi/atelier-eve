import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
	const [item, setItem] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		try {
			axios.get(`http://localhost:2000/products/${id}`).then((res) => {
				setItem(res.data);
			});
		} catch (error) {
			console.log(error.message);
		}
	}, [id]);

	console.log("item", item);

	return (
		<div>
			<p>product detail page</p>
		</div>
	);
};

export default ProductDetail;
