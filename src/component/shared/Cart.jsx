import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../provide/CartProvider";
import { Link } from "react-router-dom";

export default function Exp() {
	const [open, setOpen] = useState(false);

	const { cartItems, dispatch } = useCart();

	const handleRemove = (id) => {
		console.log("id: ", id);
		dispatch({ type: "REMOVE_FROM_CART", payload: id });
	};

	const cartPrice = cartItems.map((ca) => ca.productPrice);

	const totalCartPrice = cartPrice.reduce((accumulator, price) => {
		return accumulator + price;
	}, 0);

	return (
		<>
			<div>
				<button
					onClick={() => setOpen(true)}
					className="p-2 text-gray-900/80 hover:text-[#fab07a] duration-200 focus:outline-2 outline-offset-2 outline-[#fab07a]"
				>
					<ShoppingBag />
				</button>
			</div>

			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-50"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="w-screen max-w-md pointer-events-auto">
										<div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900">
														Shopping cart
													</Dialog.Title>
													<div className="flex items-center ml-3 h-7">
														<button
															type="button"
															className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
															onClick={() => setOpen(false)}
														>
															<span className="absolute -inset-0.5" />
															<span className="sr-only">Close panel</span>
															<X
																className="w-6 h-6"
																aria-hidden="true"
															/>
														</button>
													</div>
												</div>

												<div className="mt-8">
													<div className="flow-root">
														<ul
															role="list"
															className="-my-6 divide-y divide-gray-200"
														>
															{cartItems.map((product) => (
																<li
																	key={product.productId}
																	className="flex py-6"
																>
																	<div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
																		<img
																			src={product.productImage}
																			alt={product.productNameIs}
																			className="object-cover object-center w-full h-full"
																		/>
																	</div>

																	<div className="flex flex-col flex-1 ml-4">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					<Link
																						className="hover:underline"
																						to={`/productsDetail/${product.productId}`}
																						onClick={() =>
																							setOpen(false)
																						}
																					>
																						{
																							product.productNameIs
																						}
																					</Link>
																				</h3>
																				<p className="ml-4">
																					${product.productPrice}
																				</p>
																			</div>
																			<p className="mt-1 text-sm text-gray-500">
																				Size {product.clothSize}
																			</p>
																		</div>
																		<div className="flex items-end justify-between flex-1 text-sm">
																			<p className="text-gray-500">
																				Qty 1
																			</p>

																			<div className="flex">
																				<button
																					type="button"
																					className="font-medium text-orange-500 hover:text-orange-400"
																					onClick={() =>
																						handleRemove(
																							product.productId
																						)
																					}
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													</div>
												</div>
											</div>

											<div className="px-4 py-6 border-t border-gray-200 sm:px-6">
												<div className="flex justify-between text-base font-medium text-gray-900">
													<p>Subtotal</p>
													<p>${totalCartPrice.toFixed(2)}</p>
												</div>
												<p className="mt-0.5 text-sm text-gray-500">
													Shipping and taxes calculated at checkout.
												</p>
												<div className="mt-6">
													<Link
														to="/checkout"
														className="inline-flex justify-center w-full px-4 py-2 mt-4 text-base font-semibold text-orange-600 duration-200 bg-orange-300 border-none rounded-lg shadow-lg outline-none cursor-pointer active:scale-95 hover:bg-orange-300 shadow-gray-700/30"
													>
														Checkout
													</Link>
												</div>
												<div className="flex justify-center mt-6 text-sm text-center text-gray-500">
													<p>
														or
														<button
															type="button"
															className="ml-2 font-medium text-orange-500 hover:text-orange-400 group"
															onClick={() => setOpen(false)}
														>
															Continue Shopping
															<span
																aria-hidden="true"
																className="duration-200 group-hover:ml-2"
															>
																{" "}
																&rarr;
															</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
