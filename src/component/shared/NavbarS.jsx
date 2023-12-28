/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useContext, useState } from "react";
import { Menu, Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { AlignJustify, BellIcon, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { AuthContext } from "../../provide/AuthProvider";

const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

const navigation = {
	categories: [
		{
			id: "women",
			name: "Women",
			featured: [
				{
					name: "New Arrivals",
					href: "#",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
					imageAlt:
						"Models sitting back to back, wearing Basic Tee in black and bone.",
				},
				{
					name: "Basic Tees",
					href: "#",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
					imageAlt:
						"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
				},
			],
			sections: [
				{
					id: "clothing",
					name: "Clothing",
					items: [
						{ name: "Tops", href: "#" },
						{ name: "Dresses", href: "#" },
						{ name: "Pants", href: "#" },
						{ name: "Denim", href: "#" },
						{ name: "Sweaters", href: "#" },
						{ name: "T-Shirts", href: "#" },
						{ name: "Jackets", href: "#" },
						{ name: "Activewear", href: "#" },
						{ name: "Browse All", href: "#" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Watches", href: "#" },
						{ name: "Wallets", href: "#" },
						{ name: "Bags", href: "#" },
						{ name: "Sunglasses", href: "#" },
						{ name: "Hats", href: "#" },
						{ name: "Belts", href: "#" },
					],
				},
				{
					id: "brands",
					name: "Brands",
					items: [
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Significant Other", href: "#" },
					],
				},
			],
		},
		{
			id: "men",
			name: "Men",
			featured: [
				{
					name: "New Arrivals",
					href: "#",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
					imageAlt:
						"Drawstring top with elastic loop closure and textured interior padding.",
				},
				{
					name: "Artwork Tees",
					href: "#",
					imageSrc:
						"https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
					imageAlt:
						"Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
				},
			],
			sections: [
				{
					id: "clothing",
					name: "Clothing",
					items: [
						{ name: "Tops", href: "#" },
						{ name: "Pants", href: "#" },
						{ name: "Sweaters", href: "#" },
						{ name: "T-Shirts", href: "#" },
						{ name: "Jackets", href: "#" },
						{ name: "Activewear", href: "#" },
						{ name: "Browse All", href: "#" },
					],
				},
				{
					id: "accessories",
					name: "Accessories",
					items: [
						{ name: "Watches", href: "#" },
						{ name: "Wallets", href: "#" },
						{ name: "Bags", href: "#" },
						{ name: "Sunglasses", href: "#" },
						{ name: "Hats", href: "#" },
						{ name: "Belts", href: "#" },
					],
				},
				{
					id: "brands",
					name: "Brands",
					items: [
						{ name: "Re-Arranged", href: "#" },
						{ name: "Counterfeit", href: "#" },
						{ name: "Full Nelson", href: "#" },
						{ name: "My Way", href: "#" },
					],
				},
			],
		},
	],
	pages: [
		{ name: "Add product", href: "/addProducts" },
		{ name: "Stores", href: "#" },
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const NavbarS = () => {
	const { user, logOut } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	const handleLogOut = () => {
		logOut();
	};

	return (
		<div className=" bg-[#f3e6dc]">
			{/* Mobile menu */}
			<Transition.Root
				show={open}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-40 lg:hidden"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
					</Transition.Child>

					<div
						className="fixed inset-0 flex"
						style={{ zIndex: "0" }}
					>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-[#f3e6dc] shadow-xl">
								<div className="flex px-4 pt-5 pb-2">
									<button
										type="button"
										className="relative inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
										onClick={() => setOpen(false)}
									>
										<span className="absolute -inset-0.5" />
										<span className="sr-only">
											Close menu
										</span>
										<X
											className="w-6 h-6"
											aria-hidden="true"
										/>
									</button>
								</div>

								{/* tabs name mobile version */}
								<Tab.Group
									as="div"
									className="z-0 mt-2"
								>
									<div className="border-b border-gray-200">
										<Tab.List className="flex px-4 -mb-px space-x-8">
											{navigation.categories.map(
												(category) => (
													<Tab
														key={category.name}
														className={({
															selected,
														}) =>
															classNames(
																selected
																	? "border-[#fab07a] text-[#fab07a]"
																	: "border-transparent text-gray-700 font-bold",
																"flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fab07a]"
															)
														}
													>
														{category.name}
													</Tab>
												)
											)}
										</Tab.List>
									</div>

									<Tab.Panels as={Fragment}>
										{navigation.categories.map(
											(category) => (
												<Tab.Panel
													key={category.name}
													className="px-4 pt-10 pb-8 space-y-10"
												>
													<div className="grid grid-cols-2 gap-x-4">
														{category.featured.map(
															(item) => (
																<div
																	key={
																		item.name
																	}
																	className="relative text-sm group"
																>
																	<div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
																		<img
																			src={
																				item.imageSrc
																			}
																			alt={
																				item.imageAlt
																			}
																			className="object-cover object-center"
																		/>
																	</div>
																	<a
																		href={
																			item.href
																		}
																		className="block mt-6 font-medium text-gray-900"
																	>
																		<span
																			className="absolute inset-0 z-10"
																			aria-hidden="true"
																		/>
																		{
																			item.name
																		}
																	</a>
																	<p
																		aria-hidden="true"
																		className="mt-1"
																	>
																		Shop now
																	</p>
																</div>
															)
														)}
													</div>
													{category.sections.map(
														(section) => (
															<div
																key={
																	section.name
																}
															>
																<p
																	id={`${category.id}-${section.id}-heading-mobile`}
																	className="font-medium text-gray-900"
																>
																	{
																		section.name
																	}
																</p>
																<ul
																	role="list"
																	aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
																	className="flex flex-col mt-6 space-y-6"
																>
																	{section.items.map(
																		(
																			item
																		) => (
																			<li
																				key={
																					item.name
																				}
																				className="flow-root"
																			>
																				<a
																					href={
																						item.href
																					}
																					className="block p-2 -m-2 text-gray-500"
																				>
																					{
																						item.name
																					}
																				</a>
																			</li>
																		)
																	)}
																</ul>
															</div>
														)
													)}
												</Tab.Panel>
											)
										)}
									</Tab.Panels>
								</Tab.Group>

								<div className="px-4 py-6 space-y-6 border-t border-gray-200">
									{navigation.pages.map((page) => (
										<div
											key={page.name}
											className="flow-root"
										>
											<a
												href={page.href}
												className="block p-2 -m-2 font-medium text-gray-900"
											>
												{page.name}
											</a>
										</div>
									))}
								</div>

								{user ? (
									<div className="pt-4 pb-3 border-t border-gray-700">
										<div className="flex items-center px-5">
											<div className="flex-shrink-0">
												{/* <img
													className="w-10 h-10 rounded-full"
													src={user.imageUrl}
													alt=""
												/> */}
												{user?.photoURL && (
													<img
														className="w-10 h-10 rounded-full"
														src={user?.photoURL}
														alt=""
													/>
												)}
											</div>
											<div className="ml-3">
												<div className="text-base font-semibold leading-none text-gray-700">
													{user?.displayName}
												</div>
												<div className="text-sm font-medium leading-none text-gray-500">
													{user?.email}
												</div>
											</div>
											<button
												type="button"
												className="relative flex-shrink-0 p-1 ml-auto  bg-transparent rounded-full text-gray-400 hover:text-[#fab07a] duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
											>
												<span className="absolute -inset-1.5" />
												<span className="sr-only">
													View notifications
												</span>
												<BellIcon
													className="w-6 h-6"
													aria-hidden="true"
												/>
											</button>
										</div>
									</div>
								) : (
									<div className="px-4 py-6 space-y-6 border-t border-gray-200">
										<div className="flow-root">
											<Link
												to="/auth/login"
												className="block p-2 -m-2 font-medium text-gray-900"
											>
												Sign in
											</Link>
										</div>
										<div className="flow-root">
											<Link
												to="/auth/register"
												className="block p-2 -m-2 font-medium text-gray-900"
											>
												Create account
											</Link>
										</div>
									</div>
								)}

								<div className="px-4 py-6 border-t border-gray-200">
									<a
										href="/"
										className="flex items-center p-2 -m-2"
									>
										<img
											src="https://tailwindui.com/img/flags/flag-canada.svg"
											alt=""
											className="flex-shrink-0 block w-5 h-auto"
										/>
										<span className="block ml-3 text-base font-medium text-gray-900">
											CAD
										</span>
										<span className="sr-only">
											, change currency
										</span>
									</a>
								</div>

								<div className="flex items-center justify-center">
									<button
										className="relative inline-flex items-center justify-center py-2 pl-4 pr-4 -m-2 text-gray-400 rounded-md"
										onClick={() => setOpen(false)}
									>
										<span className="absolute -inset-0.5" />
										<span className="sr-only">
											Close menu
										</span>
										<X />
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header
				className="relative  bg-[#f3e6dc]"
				style={{ zIndex: "999" }}
			>
				<nav
					aria-label="Top"
					className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
				>
					<div className="border-b border-orange-900/20">
						<div className="flex items-center h-16">
							{!open && (
								<button
									type="button"
									className="relative p-2 text-gray-400 bg-transparent  focus-visible:outline-offset-2 focus-visible:outline-[#fab07a] rounded-md lg:hidden"
									style={{ zIndex: "0" }}
									onClick={() => setOpen(true)}
								>
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open menu</span>

									<AlignJustify
										className="w-6 h-6"
										aria-hidden="true"
									/>
								</button>
							)}
							{open && (
								<button
									type="button"
									className="relative inline-flex items-center justify-center py-2 pl-4 pr-4 -m-2 text-gray-400 rounded-md"
									style={{ zIndex: "9999" }}
									onClick={() => setOpen(false)}
								>
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Close menu</span>
									<X
										className="w-6 h-6"
										aria-hidden="true"
									/>
								</button>
							)}

							{/* Logo */}
							<div className="flex ml-4 lg:ml-0">
								<a href="/">
									<span className="sr-only">
										Your Company
									</span>
									<img
										className="w-auto h-8"
										src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
										alt=""
									/>
								</a>
							</div>

							{/*
									Flyout menus / large device
								*/}
							<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{navigation.categories.map((category) => (
										<Popover
											key={category.name}
											className="flex"
										>
											{({ open }) => (
												<>
													<div className="relative flex">
														<Popover.Button
															className={classNames(
																open
																	? "border-indigo-600 text-indigo-600"
																	: "border-transparent text-gray-700 hover:text-gray-800",
																"relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
															)}
														>
															{category.name}
														</Popover.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0"
														enterTo="opacity-100"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
															{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
															<div
																className="absolute inset-0 bg-[#f3e6dc] shadow top-1/2"
																aria-hidden="true"
															/>

															<div className="relative bg-[#f3e6dc]">
																<div className="px-8 mx-auto max-w-7xl">
																	<div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
																		<div className="grid grid-cols-2 col-start-2 gap-x-8">
																			{category.featured.map(
																				(
																					item
																				) => (
																					<div
																						key={
																							item.name
																						}
																						className="relative text-base group sm:text-sm"
																					>
																						<div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
																							<img
																								src={
																									item.imageSrc
																								}
																								alt={
																									item.imageAlt
																								}
																								className="object-cover object-center"
																							/>
																						</div>
																						<a
																							href={
																								item.href
																							}
																							className="block mt-6 font-medium text-gray-900"
																						>
																							<span
																								className="absolute inset-0 z-10"
																								aria-hidden="true"
																							/>
																							{
																								item.name
																							}
																						</a>
																						<p
																							aria-hidden="true"
																							className="mt-1"
																						>
																							Shop
																							now
																						</p>
																					</div>
																				)
																			)}
																		</div>
																		<div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
																			{category.sections.map(
																				(
																					section
																				) => (
																					<div
																						key={
																							section.name
																						}
																					>
																						<p
																							id={`${section.name}-heading`}
																							className="font-medium text-gray-900"
																						>
																							{
																								section.name
																							}
																						</p>
																						<ul
																							role="list"
																							aria-labelledby={`${section.name}-heading`}
																							className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																						>
																							{section.items.map(
																								(
																									item
																								) => (
																									<li
																										key={
																											item.name
																										}
																										className="flex"
																									>
																										<a
																											href={
																												item.href
																											}
																											className="hover:text-gray-800"
																										>
																											{
																												item.name
																											}
																										</a>
																									</li>
																								)
																							)}
																						</ul>
																					</div>
																				)
																			)}
																		</div>
																	</div>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									))}

									{navigation.pages.map((page) => (
										<a
											key={page.name}
											href={page.href}
											className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
										>
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							<div className="flex items-center ml-auto">
								{user ? (
									<>
										<Menu
											as="div"
											className="relative hidden ml-3 sm:block"
										>
											<div className="hidden md:mr-2 lg:mr-0 lg:block">
												<Menu.Button
													className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
													// className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
												>
													<span className="absolute -inset-1.5" />
													<span className="sr-only">
														Open user menu
													</span>
													{user?.photoURL && (
														<img
															className="w-8 h-8 rounded-full"
															src={user?.photoURL}
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
												<Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right  bg-[#fff] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Items className="px-4 py-2 text-base text-gray-300  duration-200 hover:bg-[#fff] bg-opacity-50 cursor-pointer">
														<Link to="/profile">
															User Profile
														</Link>
													</Menu.Items>

													<Menu.Items className="px-4 py-2 text-base text-gray-300  duration-200 hover:bg-[#fff] bg-opacity-50 cursor-pointer">
														Settings
													</Menu.Items>

													<Menu.Items
														className="px-4 py-2 text-base text-gray-300  duration-200 hover:bg-[#fff] bg-opacity-50 cursor-pointer"
														onClick={handleLogOut}
													>
														<button>Logout</button>
													</Menu.Items>
												</Menu.Items>
											</Transition>
										</Menu>
									</>
								) : (
									<div className="hidden text-sm font-semibold text-gray-900/80 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<Link
											to="/auth/login"
											className=" hover:text-[#fab07a] duration-200"
										>
											Sign in
										</Link>
										<span
											className="w-px h-6 bg-gray-300"
											aria-hidden="true"
										/>
										<Link
											to="/auth/register"
											className=" hover:text-[#fab07a] duration-200"
										>
											Create account
										</Link>
									</div>
								)}

								{/* Search */}
								<div className="flex lg:ml-6">
									<a
										href="#"
										className="p-2 text-gray-900/80 hover:text-[#fab07a] duration-200 focus:outline-2 outline-offset-2 outline-[#fab07a]"
									>
										<span className="sr-only">Search</span>
										<Search
											className="w-6 h-6"
											aria-hidden="true"
										/>
									</a>
								</div>

								{/* Cart */}
								<div className="flow-root mt-1 lg:ml-6">
									<div className="flex items-center p-2 group">
										<div aria-hidden="true">
											<Cart />
										</div>
										<span className="ml-2 text-sm font-medium text-[#fab07a]">
											0
										</span>
										<span className="sr-only">
											items in cart, view bag
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
};

export default NavbarS;
