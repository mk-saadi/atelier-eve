import { useContext, useState, Fragment } from "react";
import { AuthContext } from "../../provide/AuthProvider";
// import { ChevronDown } from '@heroicons/react/20/solid'
import { Switch, Listbox, Transition } from "@headlessui/react";
import {
	ChevronsUpDown,
	ChevronDown,
	Image,
	PhoneOutgoingIcon,
	Check,
} from "lucide-react";

const people = [{ gender: "" }, { gender: "Male" }, { gender: "Female" }];

const season = [
	{ sea: "" },
	{ sea: "Summer" },
	{ sea: "Winter" },
	{ sea: "Rainy" },
	{ sea: "All" },
];

const femaleCategory = [
	{ cat: "" },
	{ cat: "Tops" },
	{ cat: "Sweaters" },
	{ cat: "Denim" },
	{ cat: "Jackets" },
	{ cat: "T-Shirts" },
	{ cat: "Pants" },
	{ cat: "Activewear" },
	{ cat: "Bras" },
	{ cat: "Gown" },
	{ cat: "Wedding Dress" },
	{ cat: "Vest" },
	{ cat: "Long Coat" },
];

const maleCategory = [
	{ cat: "" },
	{ cat: "Sweaters" },
	{ cat: "Denim" },
	{ cat: "Jackets" },
	{ cat: "T-Shirts" },
	{ cat: "Pants" },
	{ cat: "Jeans" },
	{ cat: "Activewear" },
	{ cat: "Long Coat" },
];

const accessoriesCategory = [
	{ cat: "" },
	{ cat: "Watches" },
	{ cat: "Wallets" },
	{ cat: "Bags" },
	{ cat: "Sunglasses" },
	{ cat: "Hats" },
	{ cat: "Belts" },
];

const brandCategory = [
	{ cat: "" },
	{ cat: "Adidas" },
	{ cat: "Nike" },
	{ cat: "Gucci" },
	{ cat: "Gap" },
	{ cat: "Sunglasses" },
	{ cat: "Calvin Klein" },
	{ cat: "Chanel" },
	{ cat: "Burberry" },
	{ cat: "Reebok" },
	{ cat: "Prada" },
	{ cat: "Converse" },
	{ cat: "Old Navy" },
	{ cat: "American Eagle" },
	{ cat: "Lacoste" },
	{ cat: "Puma" },
	{ cat: "Louis Vuitton" },
	{ cat: "Tommy Hilfiger" },
	{ cat: "UNIQLO" },
	{ cat: "Audemars Piguet" },
	{ cat: "Patek Philippe" },
	{ cat: "TAG Heuer" },
	{ cat: "Seiko" },
	{ cat: "Swatch" },
	{ cat: "Armani" },
	{ cat: "Timex" },
	{ cat: "Omega" },
	{ cat: "Rolex" },
	{ cat: "Richard Mille" },
	{ cat: "Bulgari" },
	{ cat: "Citizen" },
	{ cat: "Bottega Veneta" },
	{ cat: "MontaBlanc" },
	{ cat: "Bellroy" },
	{ cat: "Tom Ford" },
	{ cat: "Goorin" },
	{ cat: "Bailey" },
	{ cat: "Stetson" },
	{ cat: "Akubra" },
];

const Exp = () => {
	const [selectedGender, setSelectedGender] = useState(people[0]);
	const [selectedMale, setSelectedMale] = useState(maleCategory[0]);
	const [selectedFemale, setSelectedFemale] = useState(femaleCategory[0]);
	const [selectedSeason, setSelectedSeason] = useState(season[0]);
	const [selectedAccessories, setSelectedAccessories] = useState(
		accessoriesCategory[0]
	);
	const [selectedBrand, setSelectedBrand] = useState(brandCategory[0]);

	return (
		<div>
			{/* <Listbox
				value={selectedGender}
				onChange={setSelectedGender}
			>
				<div className="relative w-full mt-1">
					<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-300">
						<span className="block truncate">
							{selectedGender.gender}
						</span>
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
										`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
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
													selected
														? "font-medium"
														: "font-normal"
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
			</Listbox> */}

			{/* main select here */}
			<div>
				<div className="flex items-center justify-center p-8 bg-gray-300">
					<Listbox
						name="gender"
						id="gender"
						// onChange={(e) => {
						// 	const selectedGenderValue = e.target.value;
						// 	setSelectedGender({ gender: selectedGenderValue });
						// }}
						onChange={setSelectedGender}
						value={selectedGender.gender}
					>
						<div className="relative w-full mt-1">
							<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ring-1 ring-inset ring-gray-300">
								<span className="block truncate">
									{selectedGender.gender}
								</span>
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
									{/* {people.map((person, index) => (
										<Listbox.Option key={index}>
											value={person.gender}
											{person.gender}
										</Listbox.Option>
									))} */}
									{people.map((person, personIdx) => (
										<Listbox.Option
											key={personIdx}
											className={({ active }) =>
												`relative select-none py-2 pl-10 pr-4 font-semibold cursor-pointer ${
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
															selected
																? "font-medium"
																: "font-normal"
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

					<select
						name="category"
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
								setSelectedMale({ cat: selectedCategoryValue });
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
					>
						{selectedGender.gender === "Male"
							? maleCategory.map((category, index) => (
									<option
										key={index}
										value={category.cat}
									>
										{category.cat}
									</option>
							  ))
							: selectedGender.gender === "Female"
							? femaleCategory.map((category, index) => (
									<option
										key={index}
										value={category.cat}
									>
										{category.cat}
									</option>
							  ))
							: accessoriesCategory.map((category, index) => (
									<option
										key={index}
										value={category.cat}
									>
										{category.cat}
									</option>
							  ))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default Exp;
