import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { AlignJustify, Bell, ListX } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provide/AuthProvider";
import Cart from "./Cart";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
	{ name: "Reports", href: "#", current: false },
];

const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const { user } = useContext(AuthContext);

	return (
		<div>
			<div className="min-h-full">
				<Disclosure
					as="nav"
					className="bg-gray-800"
				>
					{({ open }) => (
						<>
							<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
								<div className="flex items-center justify-between h-16">
									<div className="flex items-center">
										<Link
											to="/"
											className="flex-shrink-0"
										>
											<img
												className="w-8 h-8"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
												alt="Your Company"
											/>
										</Link>
										<div className="hidden md:block">
											<div className="flex items-baseline ml-10 space-x-4">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(
															item.current
																? "bg-gray-900 text-white"
																: "text-gray-300 hover:bg-gray-700 hover:text-white",
															"rounded-md px-3 py-2 text-sm font-medium"
														)}
														aria-current={
															item.current
																? "page"
																: undefined
														}
													>
														{item.name}
													</a>
												))}
											</div>
										</div>
									</div>

									{user ? (
										<div className="hidden md:block">
											<div className="flex items-center ml-4 md:ml-6">
												<button
													type="button"
													className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
												>
													<span className="absolute -inset-1.5" />
													<span className="sr-only">
														View notifications
													</span>

													<Bell absoluteStrokeWidth />
												</button>

												{/* Profile dropdown */}

												<Menu
													as="div"
													className="relative ml-3"
												>
													<div className="flex items-center justify-center">
														<Menu.Button className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none">
															<span className="absolute -inset-1.5" />
															<span className="sr-only">
																Open user menu
															</span>
															{user?.photoURL && (
																<img
																	className="w-8 h-8 rounded-full"
																	src={
																		user?.photoURL
																	}
																	alt=""
																/>
															)}
														</Menu.Button>
													</div>
													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95"
													>
														<Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right  bg-[#2d3250] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
															{userNavigation.map(
																(item) => (
																	<Menu.Item
																		key={
																			item.name
																		}
																	>
																		{({
																			active,
																		}) => (
																			<a
																				href={
																					item.href
																				}
																				className={classNames(
																					active
																						? "bg-slate-600"
																						: "",
																					"block px-4 py-2 text-sm text-gray-200"
																				)}
																			>
																				{
																					item.name
																				}
																			</a>
																		)}
																	</Menu.Item>
																)
															)}
														</Menu.Items>
													</Transition>
												</Menu>

												<div className="ml-4">
													<span className="sr-only">
														Open cart
													</span>

													<Cart />
												</div>
											</div>
										</div>
									) : (
										<div className="flex space-x-3">
											<Link to="/auth/login">login</Link>
											<Link to="/auth/register">
												sign up
											</Link>
										</div>
									)}

									<div className="flex -mr-2 md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="absolute -inset-0.5" />
											<span className="sr-only">
												Open main menu
											</span>
											{open ? (
												// <XMarkIcon
												// 	className="block w-6 h-6"
												// 	aria-hidden="true"
												// />
												<ListX absoluteStrokeWidth />
											) : (
												// <Bars3Icon
												// 	className="block w-6 h-6"
												// 	aria-hidden="true"
												// />
												<AlignJustify
													absoluteStrokeWidth
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"block rounded-md px-3 py-2 text-base font-medium"
											)}
											aria-current={
												item.current
													? "page"
													: undefined
											}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>

								<div className="pt-4 pb-3 border-t border-gray-700">
									<div className="flex items-center px-5">
										<div className="flex-shrink-0">
											{user?.photoURL && (
												<img
													className="w-10 h-10 rounded-full"
													src={user?.photoURL}
													alt=""
												/>
											)}
										</div>
										<div className="ml-3">
											<div className="text-base font-medium leading-none text-white">
												{user?.displayName}
											</div>
											<div className="text-sm font-medium leading-none text-gray-400">
												{user?.email}
											</div>
										</div>
										<button
											type="button"
											className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">
												View notifications
											</span>
											{/* <BellIcon
												className="w-6 h-6"
												aria-hidden="true"
											/> */}
											<Bell absoluteStrokeWidth />
										</button>
									</div>
									<div className="z-50 px-2 mt-3 space-y-1">
										{userNavigation.map((item) => (
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default Navbar;