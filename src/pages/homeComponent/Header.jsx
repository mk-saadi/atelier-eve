import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import error from "../../assets/error.webp";

const Header = () => {
	const [product, setProduct] = useState([]);
	console.log("product: ", product);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("http://localhost:2000/products");
				if (res.status === 200) {
					setProduct(res.data);
				}
			} catch (error) {
				console.log();
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Swiper
				className="relative w-full h-fit mySwiper"
				loop={true}
			>
				{product.map((it) => (
					<SwiperSlide
						key={it._id}
						className="bg-[#17171750] h-min"
					>
						<Link
							className="relative flex w-full h-full p-4 active:cursor-grab"
							to={`/productsDetail/${it._id}`}
						>
							<div className="flex-1">
								<p>{it.productName}</p>
								<p>{it.accessCat}</p>
								{it.genderCat !== "" && <p>{it.genderCat}</p>}
							</div>
							<div className="absolute top-0 w-full h-full">
								{it?.productImages && (
									<img
										src={it?.productImages[0]}
										alt=""
										className="w-full h-max opacity-40 blur"
										onError={(e) => {
											e.target.src = error;
										}}
										loading="lazy"
									/>
								)}
							</div>
							<div
								className="h-min"
								style={{ zIndex: "9999" }}
							>
								{it?.productImages && (
									<img
										src={it?.productImages[0]}
										alt=""
										className="h-[250px] rounded-xl shadow-xl md:h-[450px]"
										onError={(e) => {
											e.target.src = error;
										}}
										loading="lazy"
									/>
								)}
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default Header;
