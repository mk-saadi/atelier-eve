import * as React from "react";
import { useContext, useState, Fragment } from "react";
import { AuthContext } from "../../provide/AuthProvider";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown, Check } from "lucide-react";
import Toast from "../../component/hooks/Toast";
import useToast from "../../component/hooks/useToast";
import imageCompression from "browser-image-compression";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
function getStyles(size, clothSize, theme) {
	return {
		fontWeight:
			clothSize.indexOf(size) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const people = [{ gender: "" }, { gender: "Female" }, { gender: "Male" }];

const status = [
	{ cat: "Available" },
	{ cat: "Upcoming" },
	{ cat: "Sold Out" },
	{ cat: "Hot" },
	{ cat: "Trending" },
];

const season = [{ sea: "All" }, { sea: "Rainy" }, { sea: "Summer" }, { sea: "Winter" }];

const femaleCategory = [
	{ cat: "Activewear" },
	{ cat: "Bras" },
	{ cat: "Denim" },
	{ cat: "Gown" },
	{ cat: "Jackets" },
	{ cat: "Long Coat" },
	{ cat: "Pants" },
	{ cat: "Shorts" },
	{ cat: "Sweaters" },
	{ cat: "Tops" },
	{ cat: "T-Shirts" },
	{ cat: "Vest" },
	{ cat: "Wedding Dress" },
];

const maleCategory = [
	{ cat: "Activewear" },
	{ cat: "Denim" },
	{ cat: "Jackets" },
	{ cat: "Jeans" },
	{ cat: "Long Coat" },
	{ cat: "Pants" },
	{ cat: "Shorts" },
	{ cat: "Sweaters" },
	{ cat: "Sweatpant" },
	{ cat: "T-Shirts" },
];

const accessoriesCategory = [
	{ cat: "Bags" },
	{ cat: "Belts" },
	{ cat: "Hats" },
	{ cat: "Hills" },
	{ cat: "Sunglasses" },
	{ cat: "Wallets" },
	{ cat: "Shoes" },
];

const AddProducts = () => {
	const { user } = useContext(AuthContext);
	// const [agreed, setAgreed] = useState(false);
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	const [selectedGender, setSelectedGender] = useState(people[0]);
	const [selectedMale, setSelectedMale] = useState(maleCategory[0]);
	const [selectedStatus, setSelectedStatus] = useState(status[0]);
	const [selectedFemale, setSelectedFemale] = useState(femaleCategory[0]);
	const [selectedSeason, setSelectedSeason] = useState(season[0]);
	const [selectedAccessories, setSelectedAccessories] = useState(accessoriesCategory[0]);

	// >> cloth size logic below
	const [sizes, setSizes] = React.useState([
		{ name: "XXS", inStock: false },
		{ name: "XS", inStock: false },
		{ name: "S", inStock: false },
		{ name: "M", inStock: false },
		{ name: "L", inStock: false },
		{ name: "XL", inStock: false },
		{ name: "2XL", inStock: false },
		{ name: "3XL", inStock: false },
	]);
	const [sizeName, setSizeName] = React.useState([]);
	const theme = useTheme();
	const handleSizeChange = (event) => {
		const {
			target: { value },
		} = event;
		setSizeName(typeof value === "string" ? value.split(",") : value);
		const updatedSizes = sizes.map((size) => ({
			...size,
			inStock: value.includes(size.name),
		}));
		setSizes(updatedSizes);
	};

	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";
	// >> upload image to imgbb
	const uploadToImgbb = async (imageFile) => {
		showToast("loading", "Hosting image!");
		let formData = new FormData();
		formData.append("image", imageFile);
		formData.append("key", imgbbApiKey);
		try {
			const response = await axios.post("https://api.imgbb.com/1/upload", formData);
			return response.data.data.url;
		} catch (error) {
			showToast("error", "Image hosting failed!");
		}
	};

	// >> upload product to database
	const handleProduct = async (e) => {
		e.preventDefault();
		showToast("loading", "Please wait!");

		const form = e.target;
		const productName = form.productName.value;
		const price = parseFloat(form.price.value);
		const productImages = form.productImage.files;
		const first5Images = Array.from(productImages).slice(0, 5);

		const genderCat = form.genderCat.value;
		const accessCat = form.accessCat.value;
		const seasonCat = selectedSeason.sea;
		const statusCat = selectedStatus.cat;
		const brandCat = form.brandName.value;

		const overview = form.overview.value;
		const color = form.color.value;
		const material = form.material.value;
		const description = form.description.value;
		const updatedSizes = sizes.map((size) => ({
			...size,
			inStock: sizeName.includes(size.name),
		}));

		const options = {
			maxSizeMB: 0.1,
			maxWidthOrHeight: 1280,
			useWebWorker: true,
		};

		let secondaryPhotoUrls = [];
		for (let photo of first5Images) {
			const compressedPhoto = await imageCompression(photo, options);
			const photoUrl = await uploadToImgbb(compressedPhoto);
			secondaryPhotoUrls.push(photoUrl);
		}

		let listItem = {
			productName,
			price,
			overview,
			productImages: secondaryPhotoUrls,
			accessCat,
			seasonCat,
			statusCat,
			brandCat,
			color,
			material,
			description,
			clothSizes: updatedSizes,
			uploaderName: user?.displayName,
			uploaderImage: user?.photoURL,
			uploaderEmail: user?.email,
		};
		if (genderCat !== "") {
			listItem.genderCat = genderCat;
		}

		showToast("loading", "Adding product to database!");

		try {
			const res = await axios.post("http://localhost:2000/products", listItem);
			if (res.data.acknowledged === true) {
				showToast("success", "Product added to the database!");
			}
		} catch (error) {
			showToast("error", "Couldn't add to the database. Please try again!");
		}
	};

	// >> image preview function
	const [selectedImages, setSelectedImages] = useState([]);
	const handleImageChange = (e) => {
		const files = e.target.files;
		const previewImages = [];
		if (files.length > 5) {
			showToast("error", "You can only upload up to 5 images!");
		}
		for (let i = 0; i < Math.min(files.length, 5); i++) {
			const reader = new FileReader();
			reader.onload = (event) => {
				previewImages.push(event.target.result);
				if (previewImages.length === Math.min(files.length, 5)) {
					setSelectedImages(previewImages);
				}
			};
			reader.readAsDataURL(files[i]);
		}
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}

			<div className="px-1 py-24 md:px-6 bg-orange-50 isolate sm:py-32 lg:px-8">
				<div
					className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
					aria-hidden="true"
				>
					<div
						className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
						Add new product
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-500">
						Aute magna irure deserunt veniam aliqua magna enim voluptate.
					</p>
				</div>
				<form
					action="#"
					method="POST"
					onSubmit={handleProduct}
					className="max-w-xl mx-auto mt-16 sm:mt-20"
				>
					<div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
						<div className="w-full col-span-full ">
							<label
								htmlFor="productName"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Product Name <span className="px-2 text-lg text-red-400">*</span>
							</label>
							<div className="mt-2.5">
								<input
									type="text"
									name="productName"
									id="productName"
									autoComplete="product-name"
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 bg-white"
									required
								/>
							</div>
						</div>
						<div className="w-full col-span-full ">
							<label
								htmlFor="price"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Price <span className="px-2 text-lg text-red-400">*</span>
							</label>
							<div className="relative mt-2.5 rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<span className="text-gray-500 sm:text-sm">$</span>
								</div>
								<input
									type="text"
									name="price"
									id="price"
									className="block w-full rounded-md border-0 pl-7 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6  bg-white"
									required
								/>
							</div>
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="overview"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Quick Overview{" "}
								<span className="ml-2 opacity-70">
									(use comma ( , ) between each point ){" "}
									<span className="px-2 text-lg text-red-400">*</span>
								</span>
							</label>
							<div className="mt-2.5">
								<textarea
									type="text"
									name="overview"
									id="overview"
									autoComplete="organization"
									rows={5}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6  bg-white"
									defaultValue={""}
									required
								></textarea>
							</div>
						</div>

						<div className="w-full col-span-full ">
							<label
								htmlFor="productImage"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Upload Product Image <span className="px-2 text-lg text-red-400">*</span>
							</label>
							<div className="p-2 mt-2 h-[210px] border border-dashed rounded-lg bg-white border-gray-900/50">
								<div className="w-full">
									<div className="mt-2.5">
										<input
											type="file"
											name="productImage"
											id="productImage"
											accept="image/*"
											multiple
											autoComplete="product-image"
											className="block  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6 w-full"
											required
											onChange={handleImageChange}
										/>
									</div>
								</div>

								{/* display secondary image previews */}
								<div className="flex w-full mt-4 space-x-3">
									{selectedImages.map((image, index) => (
										<div key={index}>
											<img
												src={image}
												alt={`Preview ${index + 1}`}
												className="object-cover w-20 h-20 border-2 border-orange-400 rounded-md -md"
											/>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* SELECT BELOW */}
						<div className="flex flex-col items-center justify-around w-full gap-y-3 col-span-full ">
							{/* gender */}
							<Listbox
								name="genderCat"
								id="gender"
								onChange={setSelectedGender}
								value={selectedGender.gender}
								required
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="gender"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select One{" "}
										<span className="ml-2 opacity-70">
											(not selecting any gender will give access to Accessories Category
											below) <span className="px-2 text-lg text-red-400">*</span>
										</span>
									</label>
									<Listbox.Button className="relative w-full py-4 pl-3 pr-10 text-left bg-white rounded-lg cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">{selectedGender.gender}</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{people.map((person, personIdx) => (
												<Listbox.Option
													key={personIdx}
													className={({ active }) =>
														`relative select-none py-4 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={person}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected ? "font-medium" : "font-normal"
																}`}
															>
																{person.gender}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>

							{/* access cat here */}
							<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
								<select
									name="accessCat"
									id="category"
									value={
										selectedGender.gender === "Male"
											? selectedMale.cat
											: selectedGender.gender === "Female"
											? selectedFemale.cat
											: selectedAccessories.cat
									}
									onChange={(e) => {
										const selectedCategoryValue = e.target.value;
										if (selectedGender.gender === "Male") {
											setSelectedMale({
												cat: selectedCategoryValue,
											});
										} else if (selectedGender.gender === "Female") {
											setSelectedFemale({
												cat: selectedCategoryValue,
											});
										} else {
											setSelectedAccessories({
												cat: selectedCategoryValue,
											});
										}
									}}
									className="w-full px-2 py-2 mt-1 bg-white rounded-lg cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400"
									required
								>
									{selectedGender.gender === "Male"
										? maleCategory.map((category, index) => (
												<option
													key={index}
													value={category.cat}
													className="text-base font-medium text-gray-600"
												>
													{category.cat}
												</option>
										  ))
										: selectedGender.gender === "Female"
										? femaleCategory.map((category, index) => (
												<option
													key={index}
													value={category.cat}
													className="text-base font-medium text-gray-600"
												>
													{category.cat}
												</option>
										  ))
										: accessoriesCategory.map((category, index) => (
												<option
													key={index}
													value={category.cat}
													className="text-base font-medium text-gray-600"
												>
													{category.cat}
												</option>
										  ))}
								</select>
							</div>
						</div>

						<div className="flex-col items-center justify-around w-full md:flex gap-y-4 gap-x-3 md:flex-row col-span-full ">
							{/* season here */}
							<Listbox
								value={selectedSeason}
								onChange={setSelectedSeason}
								required
								name="seasonCat"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="seasonCat"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Season <span className="px-2 text-lg text-red-400">*</span>
									</label>
									<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">{selectedSeason.sea}</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{season.map((season, seasonIdx) => (
												<Listbox.Option
													key={seasonIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={season}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected ? "font-medium" : "font-normal"
																}`}
															>
																{season.sea}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>

							{/* brand name select below */}
							<div className="w-full mt-2">
								<label
									htmlFor="brandName"
									className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Brand Name{" "}
								</label>
								<div className="">
									<input
										type="text"
										name="brandName"
										id="brandName"
										autoComplete="brand-name"
										className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
									/>
								</div>
							</div>
						</div>

						{/* cloth size select tag here */}
						<div>
							<FormControl sx={{ m: 0.5, width: 300 }}>
								<InputLabel id="demo-multiple-chip-label">
									Size <span className="px-2 text-lg text-red-400">*</span>
								</InputLabel>
								<Select
									labelId="demo-multiple-chip-label"
									id="demo-multiple-chip"
									multiple
									value={sizeName}
									onChange={handleSizeChange}
									name="clothSize"
									input={
										<OutlinedInput
											id="select-multiple-chip"
											label="Chip"
										/>
									}
									renderValue={(selected) => (
										<Box
											sx={{
												display: "flex",
												flexWrap: "wrap",
												gap: 0.5,
											}}
										>
											{selected.map((value) => (
												<Chip
													key={value}
													label={value}
												/>
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{sizes.map((size) => (
										<MenuItem
											key={size.name}
											value={size.name}
											style={getStyles(size.name, sizeName, theme)}
										>
											{size.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>

						{/* cloth status here */}
						<div className="col-span-full">
							<Listbox
								value={selectedStatus}
								onChange={setSelectedStatus}
								required
								name="statusCat"
							>
								<div className="relative w-full mt-1">
									<label
										htmlFor="statusCat"
										className="block text-sm font-semibold leading-6 text-gray-900"
									>
										Select Status <span className="px-2 text-lg text-red-400">*</span>
									</label>
									<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-400">
										<span className="block truncate">{selectedStatus.cat}</span>
										<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
											<ChevronsUpDown
												className="w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{status.map((status, statusIdx) => (
												<Listbox.Option
													key={statusIdx}
													className={({ active }) =>
														`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														} ${
															["Sold Out", "Hot", "Trending"].includes(
																status.cat
															)
																? "opacity-50 cursor-no-drop"
																: ""
														}`
													}
													value={status}
													disabled={["Sold Out", "Hot", "Trending"].includes(
														status.cat
													)}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected ? "font-medium" : "font-normal"
																}`}
															>
																{status.cat}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<Check
																		className="w-5 h-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="color"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Color <span className="ml-2 opacity-70">(use hex ( # ) value)</span>{" "}
								<span className="px-2 text-lg text-red-400">*</span>
							</label>
							<div
								// className="mt-2.5"
								className="-mt-5"
							>
								<input
									type="text"
									name="color"
									id="color"
									autoComplete="color"
									className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
									required
								/>
							</div>
						</Fade>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="material"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Material{" "}
								<span className="ml-2 opacity-70">(use comma ( , ) between each point )</span>{" "}
								<span className="px-2 text-lg text-red-400">*</span>
							</label>
							<div
								// className="mt-2.5"
								className="-mt-5"
							>
								<input
									type="text"
									name="material"
									id="material"
									autoComplete="material"
									className="block w-full rounded-md border-0 px-3.5 bg-white py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
									required
								/>
							</div>
						</Fade>

						<Fade
							cascade
							direction="up"
							triggerOnce
							className="sm:col-span-2"
						>
							<label
								htmlFor="description"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Product Description
							</label>
							<div
								// className="mt-2.5"
								className="-mt-5"
							>
								<textarea
									name="description"
									id="description"
									rows={10}
									className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
									defaultValue={""}
								/>
							</div>
						</Fade>
						{/* <Switch.Group
							as="div"
							className="flex gap-x-4 sm:col-span-2"
						>
							<div className="flex items-center h-6">
								<Switch
									checked={agreed}
									onChange={setAgreed}
									className={classNames(
										agreed
											? " bg-[#fab07a] focus:outline-none"
											: "bg-gray-200",
										"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fab07a]"
									)}
								>
									<span className="sr-only">
										Agree to policies
									</span>
									<span
										aria-hidden="true"
										className={classNames(
											agreed
												? "translate-x-3.5"
												: "translate-x-0",
											"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
										)}
									/>
								</Switch>
							</div>
							<Switch.Label className="text-sm leading-6 text-gray-600">
								By selecting this, you agree to our{" "}
								<a
									href="#"
									className="font-semibold text-indigo-600"
								>
									privacy&nbsp;policy
								</a>
								.
							</Switch.Label>
						</Switch.Group> */}
					</div>
					{/* // className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" */}
					<Fade
						triggerOnce
						direction="up"
						className="mt-7 col-span-full "
					>
						<button
							type="submit"
							style={{ width: "100%" }}
							className="w-full submitButton focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-orange-400"
						>
							Upload Product
						</button>
					</Fade>
				</form>
			</div>
		</>
	);
};

export default AddProducts;
