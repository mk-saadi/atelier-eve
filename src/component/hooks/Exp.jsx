import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Exp = () => {
	const [product, setProduct] = useState([]);
	const secondaryImage = product?.productImages;

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
			<div className="relative w-[460px] border">
				<div className="p-2 carousel-container">
					<div
						className="overflow-hidden p-2 flex justify-center items-center max-h-[468px] "
						ref={carouselRef}
					>
						<div className="carousel-item active">
							{secondaryImage && (
								<img
									src={secondaryImage[currentSlide]}
									alt=""
									className="object-cover max-w-[295px] h-[450px] rounded-xl"
								/>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-2 mt-4 h-28">
					{secondaryImage &&
						secondaryImage.map((image, index) => (
							<img
								key={index}
								src={image}
								className="h-full shadow-md"
								alt={`Image ${index}`}
							/>
						))}
				</div>
				<div className="absolute left-0 top-1/3">
					<div className="flex gap-3 font-semibold text-gray-700">
						<button
							className="btn"
							onClick={handleNextSlide}
						>
							<ArrowBigLeft />
						</button>
					</div>
				</div>

				<div className="absolute right-0 top-1/3">
					<div className="flex gap-3 font-semibold text-gray-700">
						<button
							className="btn"
							onClick={handlePreviousSlide}
						>
							<ArrowBigRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Exp;
