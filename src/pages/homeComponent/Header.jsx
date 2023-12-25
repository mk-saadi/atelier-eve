import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import error from "../../assets/error.webp";
// import "./styles.css";

const Header = () => {
	const [item, setItem] = useState([]);

	useEffect(() => {
		try {
			axios.get("http://localhost:2000/products").then((res) => {
				setItem(res.data);
			});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	console.log("item", item);
	return (
		<>
			{/* <Swiper
				className="relative w-full h-fit mySwiper"
				loop={true}
			>
				{item.map((it) => (
					<SwiperSlide
						key={it._id}
						className="bg-[#17171750] h-min"
					>
						<div className="absolute top-0 w-full">
							<img
								src={it.mainPhoto}
								alt=""
								className="w-full blur" // put his image/div beneath Link component
							/>
						</div>
						<Link
							className="flex w-full h-full p-4"
							to={`/productsDetail/${it._id}`}
							// put Link component on top of the above absolute component
						>
							<div className="flex-1">
								<p>{it.productName}</p>
								<p>{it.accessCat}</p>
								{it.genderCat !== "" && <p>{it.genderCat}</p>}
							</div>
							<div className="h-min">
								{it?.mainPhoto && (
									<img
										src={it?.mainPhoto}
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
			</Swiper> */}

			<Swiper
				className="relative w-full h-fit mySwiper"
				loop={true}
			>
				{item.map((it) => (
					<SwiperSlide
						key={it._id}
						className="bg-[#17171750] h-min"
					>
						<Link
							className="relative flex w-full h-full p-4 active:cursor-grab" // Add relative class to allow positioning of the absolute div
							to={`/productsDetail/${it._id}`}
						>
							<div className="flex-1">
								<p>{it.productName}</p>
								<p>{it.accessCat}</p>
								{it.genderCat !== "" && <p>{it.genderCat}</p>}
							</div>
							<div className="absolute top-0 w-full h-full">
								{it?.mainPhoto && (
									<img
										src={it?.mainPhoto}
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
								{it?.mainPhoto && (
									<img
										src={it?.mainPhoto}
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
