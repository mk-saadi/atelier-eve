import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContent from "../../component/hooks/PostContent";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);
	console.log("product: ", product);
	const productImg = product?.productImages;
	const duplicatedImages = productImg ? [...productImg, ...productImg] : [];

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

	return (
		<div className="flex flex-col min-h-screen mx-auto mt-6 lg:max-w-4xl xl:max-w-5xl">
			<div className="grid grid-cols-1 overflow-x-hidden lg:grid-cols-3 lg:gap-x-2 gap-y-4 lg:gap-y-0">
				{/* 1st col */}
				<div className="col-span-2">
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
											className="block mx-auto bg-orange-100 shadow-xl h-min rounded-xl cursor-grab active:cursor-grabbing"
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
							<p className="mt-2 text-xs text-center text-gray-500 md:text-sm">
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
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
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

							<div className="mt-5 border-t border-gray-900/30 max-w-prose">
								<ul className="mt-1 mb-3 text-gray-700 list-disc list-inside">
									<p className="font-semibold">
										Quick overview
									</p>
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

							{product?.color && (
								<div className="flex gap-1.5">
									{product?.color
										.split(",")
										.map((hex, index) => (
											<div
												className="mt-4 shadow-md ring-2 ring-orange-400 ring-offset-2"
												key={index}
												style={{
													backgroundColor: hex,
													width: "30px",
													height: "30px",
													marginRight: "5px",
													borderRadius: "50%",
													// border: "2px solid orange",
												}}
											></div>
										))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* seconds col span */}
				<div className="col-span-1 ">
					<p>col span 2</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;

// function classNames(...classes) {
// 	return classes.filter(Boolean).join(" ");
// }

// const ProductDetail = () => {
// 	const [product, setProduct] = useState([]);
// 	const { id } = useParams();

// 	useEffect(() => {
// 		try {
// 			axios.get(`http://localhost:2000/products/${id}`).then((res) => {
// 				setProduct(res.data);
// 			});
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	}, [id]);

// 	// console.log("item", product?.productImages);

// 	const images = product?.productImages ?? [];
// 	console.log("images: ", images); // getting images as an array

// 	return (
// 		<>
// 			<div className="container">
// 				<p>product detail page</p>
// 			</div>

// 			{/* exp below */}
// 			<div className="bg-white">
// 				<div className="pt-6">
// 					<nav aria-label="Breadcrumb">
// 						<ol
// 							role="list"
// 							className="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
// 						>
// 							{/* {product.breadcrumbs.map((breadcrumb) => (
// 								<li key={breadcrumb.id}>
// 									<div className="flex items-center">
// 										<a
// 											href={breadcrumb.href}
// 											className="mr-2 text-sm font-medium text-gray-900"
// 										>
// 											{breadcrumb.name}
// 										</a>
// 										<svg
// 											width={16}
// 											height={20}
// 											viewBox="0 0 16 20"
// 											fill="currentColor"
// 											aria-hidden="true"
// 											className="w-4 h-5 text-gray-300"
// 										>
// 											<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
// 										</svg>
// 									</div>
// 								</li>
// 							))} */}
// 							<li className="text-sm">
// 								<a
// 									href={product.href}
// 									aria-current="page"
// 									className="font-medium text-gray-500 hover:text-gray-600"
// 								>
// 									{product.name}
// 								</a>
// 							</li>
// 						</ol>
// 					</nav>

// 					{/* exp image gallery */}
// 					<div className="h-[400px] w-full">
// 						<div className="grid w-full grid-cols-3 gap-4">
// 							<img
// 								src={product.mainPhoto}
// 								alt={product.productName}
// 								// className="object-cover object-center w-auto h-full shadow-md"
// 							/>
// 						</div>
// 					</div>

// 					{/* Image gallery */}
// 					{/* <div className="max-w-2xl mx-auto mt-6 sm:px-6 border lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:h-[400px] md:[350px] overflow-hidden">
// 						<div className="hidden py-2 overflow-hidden rounded-lg aspect-h-4 aspect-w-3 lg:block">
// 							<img
// 								src={product.mainPhoto}
// 								alt={product.productName}
// 								// className="object-cover object-center w-auto h-full shadow-md"
// 							/>
// 						</div>

// 						<div className="">
// 							<div className="overflow-hidden rounded-lg aspect-h-2 aspect-w-3">
// 								{product?.productImages?.length > 0 && (
// 									<img
// 										key={0}
// 										src={product?.productImages[0]}
// 										alt={product?.productImages[0]}
// 										// className="object-cover object-center w-full h-full"
// 									/>
// 								)}
// 							</div>
// 							{product?.productImages?.length > 0 && (
// 								<img
// 									key={0}
// 									src={product?.productImages[1]}
// 									alt={product?.productImages[1]}
// 									// className="object-cover object-center w-full h-full"
// 								/>
// 							)}
// 						</div>
// 						<div className="">
// 							{product?.productImages?.length > 0 && (
// 								<img
// 									key={0}
// 									src={product?.productImages[2]}
// 									alt={product?.productImages[2]}
// 									// className="object-cover object-center w-full h-full"
// 								/>
// 							)}
// 							{product?.productImages?.length > 0 && (
// 								<img
// 									key={0}
// 									src={product?.productImages[3]}
// 									alt={product?.productImages[3]}
// 									// className="object-cover object-center w-full h-full"
// 								/>
// 							)}
// 						</div>
// 					</div> */}
// 					{/* Product info */}
// 					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
// 						{product.productName}
// 					</h1>
// 					<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
// 						<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

// 						{/* Options */}
// 						<div className="mt-4 lg:row-span-3 lg:mt-0">
// 							<h2 className="sr-only">Product information</h2>
// 							<p className="text-3xl tracking-tight text-gray-900">
// 								$ {product.price}
// 							</p>

// 							<h3 className="text-sm font-medium text-gray-900">
// 								Color
// 							</h3>

// 							{product?.color && (
// 								<div className="flex gap-1.5">
// 									{product?.color
// 										.split(",")
// 										.map((hex, index) => (
// 											<div
// 												className="mt-4 shadow-md ring-2 ring-orange-400 ring-offset-2"
// 												key={index}
// 												style={{
// 													backgroundColor: hex,
// 													width: "30px",
// 													height: "30px",
// 													marginRight: "5px",
// 													borderRadius: "50%",
// 													// border: "2px solid orange",
// 												}}
// 											></div>
// 										))}
// 								</div>
// 							)}

// 							{/* Reviews */}
// 							{/* <div className="mt-6">
// 								<h3 className="sr-only">Reviews</h3>
// 								<div className="flex items-center">
// 									<div className="flex items-center">
// 										{[0, 1, 2, 3, 4].map((rating) => (
// 											<StarIcon
// 												key={rating}
// 												className={classNames(
// 													reviews.average > rating
// 														? "text-gray-900"
// 														: "text-gray-200",
// 													"h-5 w-5 flex-shrink-0"
// 												)}
// 												aria-hidden="true"
// 											/>
// 										))}
// 									</div>
// 									<p className="sr-only">
// 										{reviews.average} out of 5 stars
// 									</p>
// 									<a
// 										href={reviews.href}
// 										className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
// 									>
// 										{reviews.totalCount} reviews
// 									</a>
// 								</div>
// 							</div> */}

// 							<form className="mt-10">
// 								{/* Colors */}
// 								<div>
// 									<h3 className="text-sm font-medium text-gray-900">
// 										Color
// 									</h3>

// 									{/* <RadioGroup
// 										value={selectedColor}
// 										onChange={setSelectedColor}
// 										className="mt-4"
// 									>
// 										<RadioGroup.Label className="sr-only">
// 											Choose a color
// 										</RadioGroup.Label>
// 										<div className="flex items-center space-x-3">
// 											{product.colors.map((color) => (
// 												<RadioGroup.Option
// 													key={color.name}
// 													value={color}
// 													className={({
// 														active,
// 														checked,
// 													}) =>
// 														classNames(
// 															color.selectedClass,
// 															active && checked
// 																? "ring ring-offset-1"
// 																: "",
// 															!active && checked
// 																? "ring-2"
// 																: "",
// 															"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
// 														)
// 													}
// 												>
// 													<RadioGroup.Label
// 														as="span"
// 														className="sr-only"
// 													>
// 														{color.name}
// 													</RadioGroup.Label>
// 													<span
// 														aria-hidden="true"
// 														className={classNames(
// 															color.class,
// 															"h-8 w-8 rounded-full border border-black border-opacity-10"
// 														)}
// 													/>
// 												</RadioGroup.Option>
// 											))}
// 										</div>
// 									</RadioGroup> */}
// 								</div>

// 								{/* Sizes */}
// 								<div className="mt-10">
// 									<div className="flex items-center justify-between">
// 										<h3 className="text-sm font-medium text-gray-900">
// 											Size
// 										</h3>
// 										<a
// 											href="#"
// 											className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
// 										>
// 											Size guide
// 										</a>
// 									</div>

// 									{/* <RadioGroup
// 										value={selectedSize}
// 										onChange={setSelectedSize}
// 										className="mt-4"
// 									>
// 										<RadioGroup.Label className="sr-only">
// 											Choose a size
// 										</RadioGroup.Label>
// 										<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
// 											{product.sizes.map((size) => (
// 												<RadioGroup.Option
// 													key={size.name}
// 													value={size}
// 													disabled={!size.inStock}
// 													className={({ active }) =>
// 														classNames(
// 															size.inStock
// 																? "cursor-pointer bg-white text-gray-900 shadow-sm"
// 																: "cursor-not-allowed bg-gray-50 text-gray-200",
// 															active
// 																? "ring-2 ring-indigo-500"
// 																: "",
// 															"group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
// 														)
// 													}
// 												>
// 													{({ active, checked }) => (
// 														<>
// 															<RadioGroup.Label as="span">
// 																{size.name}
// 															</RadioGroup.Label>
// 															{size.inStock ? (
// 																<span
// 																	className={classNames(
// 																		active
// 																			? "border"
// 																			: "border-2",
// 																		checked
// 																			? "border-indigo-500"
// 																			: "border-transparent",
// 																		"pointer-events-none absolute -inset-px rounded-md"
// 																	)}
// 																	aria-hidden="true"
// 																/>
// 															) : (
// 																<span
// 																	aria-hidden="true"
// 																	className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
// 																>
// 																	<svg
// 																		className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
// 																		viewBox="0 0 100 100"
// 																		preserveAspectRatio="none"
// 																		stroke="currentColor"
// 																	>
// 																		<line
// 																			x1={
// 																				0
// 																			}
// 																			y1={
// 																				100
// 																			}
// 																			x2={
// 																				100
// 																			}
// 																			y2={
// 																				0
// 																			}
// 																			vectorEffect="non-scaling-stroke"
// 																		/>
// 																	</svg>
// 																</span>
// 															)}
// 														</>
// 													)}
// 												</RadioGroup.Option>
// 											))}
// 										</div>
// 									</RadioGroup> */}
// 								</div>

// 								<button
// 									type="submit"
// 									className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// 								>
// 									Add to bag
// 								</button>
// 							</form>
// 						</div>

// 						<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
// 							{/* Description and details */}
// 							{/* <div>
// 								<h3 className="sr-only">Description</h3>

// 								<div className="space-y-6">
// 									<p className="text-base text-gray-900">
// 										{product.description}
// 									</p>
// 								</div>
// 							</div> */}

// 							<div className="mt-10">
// 								<h3 className="text-sm font-medium text-gray-900">
// 									Highlights
// 								</h3>

// 								{/* <div className="mt-4">
// 									<ul
// 										role="list"
// 										className="pl-4 space-y-2 text-sm list-disc"
// 									>
// 										{product.highlights.map((highlight) => (
// 											<li
// 												key={highlight}
// 												className="text-gray-400"
// 											>
// 												<span className="text-gray-600">
// 													{highlight}
// 												</span>
// 											</li>
// 										))}
// 									</ul>
// 								</div> */}
// 							</div>

// 							<div className="mt-10">
// 								<h2 className="text-sm font-medium text-gray-900">
// 									Details
// 								</h2>

// 								<div className="mt-4 space-y-6">
// 									<p className="text-sm text-gray-600">
// 										{product.details}
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default ProductDetail;
