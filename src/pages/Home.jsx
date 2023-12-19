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

const Home = () => {
	const [selectedGender, setSelectedGender] = useState(people[0]);
	const [selectedMale, setSelectedMale] = useState(maleCategory[0]);
	const [selectedFemale, setSelectedFemale] = useState(femaleCategory[0]);

	const handleGenderChange = (event) => {
		const selectedGender =
			event.target.value === "Male" ? "Male" : "Female";
		setSelectedGender(selectedGender);
	};

	const selectedCategory =
		selectedGender === "Male" ? selectedMale : selectedFemale;

	return (
		<div className="h-[200vh]">
			<p>this is home</p>

			<div>
				<Header />
			</div>

			<div className="flex items-center justify-center p-8 bg-gray-300">
				<div>
					<select
						name="gender"
						id="gender"
						onChange={handleGenderChange}
						value={selectedGender}
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
						value={selectedCategory.cat}
						onChange={(e) => {
							const selectedCategoryValue = e.target.value;
							if (selectedGender === "Male") {
								setSelectedMale({ cat: selectedCategoryValue });
							} else {
								setSelectedFemale({
									cat: selectedCategoryValue,
								});
							}
						}}
					>
						{selectedGender === "Male"
							? maleCategory.map((category, index) => (
									<option
										key={index}
										value={category.cat}
									>
										{category.cat}
									</option>
							  ))
							: femaleCategory.map((category, index) => (
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

export default Home;
