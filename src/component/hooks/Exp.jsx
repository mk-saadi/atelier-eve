import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Exp = () => {
	const [product, setProduct] = useState([]);
	const secondaryImage = product?.secondaryImages;

	console.log("secondaryImage: ", secondaryImage); // getting more than one image in an array

	useEffect(() => {
		try {
			axios.get("http://localhost:2000/products").then((res) => {
				setProduct(res.data[0]);
			});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	const [currentSlide, setCurrentSlide] = useState(0);
	const carouselRef = useRef(null);

	const handleNextSlide = () => {
		setCurrentSlide((currentSlide + 1) % secondaryImage.length);
	};

	const handlePreviousSlide = () => {
		setCurrentSlide(
			(currentSlide - 1 + secondaryImage.length) % secondaryImage.length
		);
	};

	return (
		<div className="h-[300vh] p-10 overflow-hidden">
			{/* <div className="overflow-hidden h-[650px] flex">
				{secondaryImage &&
					secondaryImage?.map((image, index) => (
						<div key={index}>
							<img
								src={image}
								alt=""
								className="object-cover w-auto h-full"
							/>
						</div>
					))}
			</div> */}

			<div className="carousel-container">
				<div
					className="carousel overflow-hidden h-[450px] "
					ref={carouselRef}
				>
					{/* Only render the active image */}
					<div className="carousel-item active">
						{secondaryImage && (
							<img
								src={secondaryImage[currentSlide]}
								alt=""
								className="object-cover max-w-[295px] h-full"
							/>
						)}
					</div>
				</div>
				<div className="flex gap-3 font-semibold text-gray-700">
					<button
						className="btn"
						onClick={handleNextSlide}
					>
						<ArrowBigLeft />
					</button>
					<button
						className="btn"
						onClick={handlePreviousSlide}
					>
						<ArrowBigRight />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Exp;
