/* eslint-disable react/prop-types */
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import useScrollToTop from "../../../component/hooks/useScrollToTop";
import { useCart } from "../../../provide/CartProvider";
import sizeWomen from "../../../assets/sizeWomenCloth.jpg";
import sizeMen from "../../../assets/sizeMenCloth.jpg";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const SecondCol = ({ product }) => {
	const { addToCart } = useCart();
	const { id } = useParams();
	const productImg = product?.productImages;
	const productNameIs = product?.productName;
	const productPrice = product?.price;

	useScrollToTop();

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

	const handleSubmit = (e) => {
		e.preventDefault();

		const form = e.target;
		const clothColor = form.clothColor.value;
		const clothSize = selectedSize.name;
		const productId = id;
		const productImage = productImg[0];

		const selectedCloth = {
			productId,
			productNameIs,
			productImage,
			clothColor,
			clothSize,
			productPrice,
		};

		addToCart(selectedCloth);
	};

	// >> modal
	const [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<h1 className="text-xl font-semibold text-gray-900/80 sm:text-2xl">
						{product.productName}
					</h1>
				</div>

				<p className="text-2xl font-semibold tracking-tight text-gray-900/80">$ {product.price}</p>

				<div className="mt-5 border-t border-gray-900/30 max-w-prose">
					<ul className="mt-1 mb-3 text-gray-700 list-disc list-inside">
						<p className="font-semibold">Quick overview</p>
						{product?.overview &&
							product?.overview.split(",").map((it, index) => (
								<li
									key={index}
									className="ml-4 font-medium"
								>
									{it}
								</li>
							))}
					</ul>
				</div>

				<div className="mt-4">
					<h3 className="text-sm font-medium text-gray-900">Select a Color</h3>
					<RadioGroup
						value={selectedColor}
						onChange={setSelectedColor}
						className="mt-4"
						name="clothColor"
					>
						<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
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

				{/* select Sizes */}
				<div className="mt-10">
					<div className="mt-10">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-medium text-gray-900">Select Size</h3>
							<div className="-mb-[13px]">
								<button
									onClick={openModal}
									className="text-sm font-medium text-orange-400 hover:text-orange-500"
								>
									Size guide
								</button>
							</div>
						</div>

						<RadioGroup
							value={selectedSize}
							onChange={setSelectedSize}
							className="mt-4 lg:px-1"
						>
							<RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
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
														? "cursor-pointer bg-white text-gray-700 shadow-xl font-semibold"
														: "cursor-not-allowed bg-gray-100 text-gray-500 font-semibold",
													active ? "ring-2 ring-orange-500" : "",
													"group relative flex items-center justify-center rounded-full border border-gray-300 py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 md:py-[12px] xl:py-[17px] sm:py-[17px] lg:py-[12px]"
												)
											}
										>
											{({ active, checked }) => (
												<>
													<RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
													{size.inStock ? (
														<span
															className={classNames(
																active ? "border " : "border-2",
																checked
																	? "border-orange-500"
																	: "border-transparent",
																"pointer-events-none absolute -inset-px rounded-full"
															)}
															aria-hidden="true"
														/>
													) : (
														<span
															aria-hidden="true"
															className="absolute border-2 border-red-400 rounded-full pointer-events-none -inset-px"
														>
															<svg
																className="absolute inset-0 w-full h-full text-gray-200 stroke-2 stroke-red-400"
																viewBox="0 0 100 100"
																preserveAspectRatio="none"
																stroke="currentColor"
															>
																<line
																	x1={0}
																	y1={100}
																	x2={100}
																	y2={0}
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
						value="Add to cart"
						className="inline-flex justify-center w-full px-4 py-2 mt-4 text-base font-semibold text-orange-600 duration-200 bg-orange-300 border-none rounded-lg shadow-lg outline-none cursor-pointer active:scale-95 hover:bg-orange-300 shadow-gray-700/30"
					/>
				</div>
			</form>

			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/30" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="p-6 overflow-hidden text-left align-middle transition-all transform bg-white w-fit authShadow rounded-xl">
									<Dialog.Title
										as="h2"
										className="text-xl font-medium leading-6 text-gray-700"
									>
										Size guide.
									</Dialog.Title>

									<div className="flex flex-col justify-center gap-2 mt-2 text-sm font-medium text-gray-700 md:flex-row">
										<div>
											<p>Size guide for men.</p>
											<img
												src={sizeMen}
												alt=""
												className="xl:h-[320px] w-auto rounded-md shadow-xl"
											/>
										</div>
										<div>
											<p>Size guide for women.</p>
											<img
												src={sizeWomen}
												alt=""
												className="xl:h-[320px] w-auto rounded-md shadow-xl"
											/>
										</div>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center px-4 py-2 text-sm font-medium text-orange-500 duration-200 bg-orange-100 border border-transparent rounded-md active:scale-95 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default SecondCol;
