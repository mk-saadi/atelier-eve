import { useState } from "react";
import Header from "./homeComponent/Header";

const people = [{ gender: "" }, { gender: "Male" }, { gender: "Female" }];

const femaleCategory = [
	{ cat: "" },
	{ cat: "Tops" },
	{ cat: "T-Shirts" },
	{ cat: "Pants" },
	{ cat: "Activewear" },
	{ cat: "Bras" },
];

const maleCategory = [
	{ cat: "" },
	{ cat: "Sweaters" },
	{ cat: "Denim" },
	{ cat: "Jackets" },
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

const Home = () => {
	// const [selectedGender, setSelectedGender] = useState(people[0]);
	const [selectedMale, setSelectedMale] = useState(maleCategory[0]);
	const [selectedFemale, setSelectedFemale] = useState(femaleCategory[0]);
	const [selectedAccessories, setSelectedAccessories] = useState(
		accessoriesCategory[0]
	);
	// const handleGenderChange = (event) => {
	// 	const selectedGender =
	// 		event.target.value === "Male" ? "Male" : "Female";
	// 	setSelectedGender(selectedGender);
	// };

	// const selectedCategory =
	// 	selectedGender === "Male" ? selectedMale : selectedFemale;

	const [selectedGender, setSelectedGender] = useState(people[0]);

	return (
		<div className="h-[200vh]">
			<p>this is home</p>

			<div>
				<Header />
			</div>

			<div className="flex items-center justify-center p-8 bg-gray-300">
				<select
					name="gender"
					id="gender"
					onChange={(e) => {
						const selectedGenderValue = e.target.value;
						setSelectedGender({ gender: selectedGenderValue });
					}}
					value={selectedGender.gender}
				>
					{people.map((person, index) => (
						<option
							key={index}
							value={person.gender}
						>
							{person.gender}
						</option>
					))}
				</select>

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
							setSelectedFemale({ cat: selectedCategoryValue });
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
	);
};

export default Home;
