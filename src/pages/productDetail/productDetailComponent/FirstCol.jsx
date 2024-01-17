import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import PostContent from "../../../component/hooks/PostContent";

const FirstCol = ({ product }) => {
	const productImg = product?.productImages;
	const duplicatedImages = productImg ? [...productImg, ...productImg] : [];

	return (
		<>
			{/* image carousel */}
			<div className="max-w-[250px] md:max-w-[350px] lg:w-[380px] lg:max-w-[600px] block mx-auto lg:mx-0">
				<div className="flex flex-col xl:ml-14 lg:ml-12">
					<Swiper
						rewind={true}
						effect={"cards"}
						grabCursor={true}
						modules={[EffectCards]}
						className="w-full mySwiper h-fit"
					>
						{duplicatedImages &&
							duplicatedImages.map((image, index) => (
								<SwiperSlide
									key={index}
									className="block mx-auto bg-orange-100 shadow-lg h-min rounded-xl cursor-grab active:cursor-grabbing"
								>
									<img
										src={image}
										className="md:h-[350px] lg:h-[420px] xl:h-[440px] h-[300px] object-cover"
										alt={`Image ${index}`}
										onClick={() => {
											window.open(image, "_blank");
										}}
									/>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
				<div>
					<p className="mt-2 text-xs text-center text-gray-500/80 xl:text-sm">
						* Click to open the image in a new window.
					</p>
				</div>
				<div className="flex flex-row items-center justify-start gap-2 mt-3">
					{productImg &&
						productImg.map((image, index) => (
							<img
								key={index}
								src={image}
								className="object-cover w-12 h-16 border border-orange-400 rounded-md lg:h-20"
								alt={`Image ${index}`}
							/>
						))}
				</div>
			</div>
			{/* image carousel ends */}

			<div className="mx-4 mt-8">
				<div>
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900/90 lg:-ml-4 sm:text-3xl">
							{product.productName}
						</h1>
					</div>

					<div className="mt-10">
						<h3 className="sr-only">Description</h3>

						<div className="space-y-6">
							<PostContent content={product.description} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FirstCol;
