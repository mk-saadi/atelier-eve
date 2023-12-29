import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContent from "../../component/hooks/PostContent";
import { RadioGroup } from "@headlessui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);
	const productImg = product?.productImages;
	const duplicatedImages = productImg ? [...productImg, ...productImg] : [];

	const [color, setColor] = useState([]);
	const [selectedColor, setSelectedColor] = useState(color[0]);
	useEffect(() => {
		try {
			const colors = product?.color.split(",");
			setColor(colors);
		} catch (error) {
			console.error("Error splitting colors:", error);
		}
	}, [product.color]);

	const [selectedSize, setSelectedSize] = useState(product?.clothSizes);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`http://localhost:2000/products/${id}`
				);
				setProduct(res.data);
			} catch (error) {
				console.error("Error fetching product data:", error.message);
			}
		};
		fetchData();
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const form = e.target;
		const clothColor = form.clothColor.value;
		const clothSize = selectedSize.name;

		const selectedCloth = {
			clothColor,
			clothSize,
		};
		console.log("selectedCloth: ", selectedCloth);
	};

	return (
		<div className="flex flex-col min-h-screen mx-auto mt-6 lg:max-w-4xl xl:max-w-5xl">
			<div className="grid grid-cols-1 overflow-x-hidden lg:grid-cols-7 lg:gap-x-2 gap-y-4 lg:gap-y-0">
				{/* 1st col */}
				<div className="col-span-5">
					{/* image carousel */}
					<div className="max-w-[250px] md:max-w-[350px] lg:max-w-[380px] block mx-auto lg:mx-0">
						<div className="flex flex-col">
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
												className="md:h-[350px] lg:h-[420px] xl:h-[440px] h-[300px]"
												alt={`Image ${index}`}
												onClick={() => {
													window.open(
														image,
														"_blank"
													);
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
										className="object-cover h-16 border border-orange-400 rounded-md lg:h-20 min-w-8"
										alt={`Image ${index}`}
									/>
								))}
						</div>
					</div>
					{/* image gallery ends */}

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
									<PostContent
										content={product.description}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 2nd col span */}
				<div className="col-span-2 mt-8">
					<form onSubmit={handleSubmit}>
						{/* {product?.color && (
							<div className="flex gap-1">
								{product?.color.split(",").map((hex, index) => (
									<div
										className="mt-4 shadow-md"
										key={index}
										style={{
											backgroundColor: hex,
											width: "30px",
											height: "30px",
											marginRight: "5px",
											borderRadius: "50%",
										}}
									></div>
								))}
							</div>
						)} */}

						<div>
							<h1 className="text-xl font-semibold text-gray-900/80 sm:text-2xl">
								{product.productName}
							</h1>
						</div>

						<p className="text-2xl font-semibold tracking-tight text-gray-900/80">
							$ {product.price}
						</p>

						<div className="mt-5 border-t border-gray-900/30 max-w-prose">
							<ul className="mt-1 mb-3 text-gray-700 list-disc list-inside">
								<p className="font-semibold">Quick overview</p>
								{product?.overview &&
									product?.overview
										.split(",")
										.slice(0, 5)
										.map((it, index) => (
											<li
												key={index}
												className="ml-4 font-medium"
											>
												{it}
											</li>
										))}
							</ul>
						</div>

						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Color
							</h3>
							<RadioGroup
								value={selectedColor}
								onChange={setSelectedColor}
								className="mt-4"
								name="clothColor"
							>
								<RadioGroup.Label className="sr-only">
									Choose a color
								</RadioGroup.Label>
								<div className="flex items-center space-x-3">
									{color.map((hex, index) => (
										<RadioGroup.Option
											key={index}
											value={hex}
											name="clothColor"
											className={`relative  flex cursor-pointer items-center justify-center rounded-full focus:outline-none ring-2 ring-gray-400 ring-offset-2 ${
												selectedColor === hex
													? "focus:ring-4 ring-2 ring-orange-400 ring-offset-2 scale-90 "
													: ""
											}`}
										>
											<span
												aria-hidden="true"
												className="rounded-full w-9 h-9 drop-shadow-md"
												style={{
													backgroundColor: hex,
												}}
											/>
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>

						{/* Sizes */}
						<div className="mt-10">
							<div className="mt-10">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-medium text-gray-900">
										Size
									</h3>
									<a
										href=""
										className="text-sm font-medium text-orange-400 hover:text-orange-500"
									>
										Size guide
									</a>
								</div>

								<RadioGroup
									value={selectedSize}
									onChange={setSelectedSize}
									className="mt-4 lg:px-1"
								>
									<RadioGroup.Label className="sr-only">
										Choose a size
									</RadioGroup.Label>
									<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
										{product?.clothSizes &&
											product?.clothSizes.map((size) => (
												<RadioGroup.Option
													key={size.name}
													value={size}
													disabled={!size.inStock}
													className={({ active }) =>
														classNames(
															size.inStock
																? "cursor-pointer bg-white text-gray-900 shadow-md"
																: "cursor-not-allowed bg-gray-50 text-gray-200",
															active
																? "ring-2 ring-orange-500"
																: "",
															"group relative flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4"
														)
													}
												>
													{({ active, checked }) => (
														<>
															<RadioGroup.Label as="span">
																{size.name}
															</RadioGroup.Label>
															{size.inStock ? (
																<span
																	className={classNames(
																		active
																			? "border"
																			: "border-2",
																		checked
																			? "border-orange-500"
																			: "border-transparent",
																		"pointer-events-none absolute -inset-px rounded-md"
																	)}
																	aria-hidden="true"
																/>
															) : (
																<span
																	aria-hidden="true"
																	className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
																>
																	<svg
																		className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
																		viewBox="0 0 100 100"
																		preserveAspectRatio="none"
																		stroke="currentColor"
																	>
																		<line
																			x1={
																				0
																			}
																			y1={
																				100
																			}
																			x2={
																				100
																			}
																			y2={
																				0
																			}
																			vectorEffect="non-scaling-stroke"
																		/>
																	</svg>
																</span>
															)}
														</>
													)}
												</RadioGroup.Option>
											))}
									</div>
								</RadioGroup>
							</div>
						</div>

						<div>
							<input
								type="submit"
								value="submit"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
