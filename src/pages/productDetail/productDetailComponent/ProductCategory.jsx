import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// eslint-disable-next-line react/prop-types
const ProductCategory = ({ genderCategory }) => {
	console.log("genderCategory: ", genderCategory);
	const [cat, setCat] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`http://localhost:2000/products/category/${genderCategory}`);
				if (res.status === 200) {
					setCat(res.data);
				}
			} catch (error) {
				setError("Couldn't fetch data. Please reload the page.");
			}
		};
		fetchData();
	}, [genderCategory]);

	return (
		<div>
			{error && (
				<div>
					<p className="text-2xl font-semibold text-red-400">{error}</p>
				</div>
			)}

			<div>
				<Swiper
					className="relative w-full h-fit mySwiper"
					loop={true}
					slidesPerView={5}
					spaceBetween={10}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
				>
					{cat.map((ca) => (
						<SwiperSlide
							key={ca._id}
							className="flex flex-col"
						>
							<Link to={`/productsDetail/${ca._id}`}>
								<div>
									<img
										src={ca.productImages[0]}
										alt=""
									/>
								</div>
								<p>{ca.productName}</p>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default ProductCategory;
