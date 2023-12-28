import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Scrollbar } from "swiper/modules";
import axios from "axios";

const Exp = () => {
	const [product, setProduct] = useState([]);
	const productImage = product?.productImages;
	console.log("productImage: ", productImage);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:2000/products");
				setProduct(res.data[0]);
			} catch (error) {
				console.error("Error fetching product data:", error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="overflow-x-hidden">
			<Swiper
				scrollbar={{
					hide: true,
				}}
				modules={[Scrollbar]}
				loop={true}
				className="w-full mySwiper h-fit"
			>
				{productImage &&
					productImage.map((image, index) => (
						<SwiperSlide
							key={index}
							className="h-min"
						>
							<img
								src={image}
								className="h-[250px] rounded-xl shadow-xl"
								alt={`Image ${index}`}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default Exp;
