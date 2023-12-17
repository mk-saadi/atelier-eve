import { useContext, useState } from "react";
import { AuthContext } from "../../provide/AuthProvider";
import "./auth.css";
import axios from "axios";
import { Eye, EyeOff, ImagePlus } from "lucide-react";

const Register = () => {
	const { signUp, updateProfileInfo } = useContext(AuthContext);

	const [activeInput, setActiveInput] = useState("");

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	const handleSignUp = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const photoURL = form.image.value;
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirm.value;

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			console.log("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters");
			console.log("Password must be at least 8 characters");
			return;
		}

		form.reset();

		signUp(email, password)
			.then((res) => {
				const users = res.user;
				updateProfileInfo(name, photoURL);

				const registrationDate = new Date();
				const userDocument = {
					photo: photoURL,
					name: name,
					email: email,
					password: password,
					role: "applicant",
					registrationDate: registrationDate.toISOString(),
				};

				axios
					.post(
						"https://difly-server-1q8p1qpt8-mk-saadi.vercel.app/users",
						userDocument
					)
					.then((response) => {
						console.log(
							"User details stored in the database:",
							response.data
						);
					})
					.catch((error) => {
						console.log(
							"Error storing user details in the database:",
							error
						);
					});

				if (users.uid) {
					alert("Please check your email");
					// logOut();
					// navigate("/login");
				}
			})
			.catch((error) => {
				console.log(error.message);
				alert(`error.message`);
			});
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	// const handleChange = (event) => {
	// 	const file = event.target.files[0];
	// 	setSelectedFile(file);
	// 	// const imageUrl = URL.createObjectURL(file);
	// 	// setImagePreview(imageUrl);

	// 	try {
	// 		const imageUrl = URL.createObjectURL(file);
	// 		setImagePreview(imageUrl);
	// 	} catch (error) {
	// 		console.error(error);
	// 		// Handle file reading error (e.g., invalid file)
	// 	}
	// };
	const handleChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const imageUrl = URL.createObjectURL(file);
			setImagePreview(imageUrl);
		}
	};

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<div>
				<form
					onSubmit={handleSignUp}
					className="flex flex-col w-full gap-y-2"
				>
					<div
						className="bg-[#42486a]"
						style={{
							borderLeft:
								activeInput === "name"
									? "3px solid #fab07a"
									: "",
							paddingLeft: activeInput === "name" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-gray-400">Your Name</p>
						<input
							type="text"
							id="inputForm"
							name="name"
						/>
					</div>

					<div
						className="bg-[#42486a]"
						style={{
							borderLeft:
								activeInput === "image"
									? "3px solid #fab07a"
									: "",
							paddingLeft: activeInput === "image" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-gray-400">Your Photo</p>

						{selectedFile ? (
							<label
								htmlFor="inputFormPic"
								className="flex gap-2 text-gray-300 cursor-pointer"
							>
								{imagePreview && (
									<img
										id="preview-image"
										src={imagePreview}
										alt="Image preview"
										className="object-cover rounded-full w-7 h-7"
									/>
								)}
								{selectedFile.name.length > 25
									? `${selectedFile.name.slice(0, 25)}...`
									: selectedFile.name}
							</label>
						) : (
							<label
								htmlFor="inputFormPic"
								className="flex items-center justify-start text-gray-300 cursor-pointer gap-x-2"
							>
								<ImagePlus /> Upload photo
							</label>
						)}

						<input
							type="file"
							id="inputFormPic"
							name="name"
							accept="image/*"
							onChange={handleChange}
							style={{ display: "none" }}
						/>
					</div>

					<div
						className="bg-[#42486a]"
						style={{
							borderLeft:
								activeInput === "email"
									? "3px solid #fab07a"
									: "",
							paddingLeft: activeInput === "email" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-gray-400">Your Email</p>
						<input
							type="text"
							id="inputForm"
							name="email"
							autoComplete="off"
							// style={{
							// 	borderLeft:
							// 		activeInput === "email"
							// 			? "3px solid #fab07a"
							// 			: "",
							// }}
							// onFocus={handleFocus}
							// onBlur={handleBlur}
						/>
					</div>

					<div
						className="bg-[#42486a]"
						style={{
							borderLeft:
								activeInput === "password"
									? "3px solid #fab07a"
									: "",
							paddingLeft:
								activeInput === "password" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-gray-400">Password</p>
						<div className="flex">
							<input
								// type="password"
								id="inputForm"
								name="password"
								autoComplete="off"
								type={showPassword ? "text" : "password"}
							/>

							<button
								type="button"
								onClick={handleTogglePassword}
								className="text-gray-300 outline-none"
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</button>
						</div>
					</div>

					<div
						className="bg-[#42486a]"
						style={{
							borderLeft:
								activeInput === "confirmPassword"
									? "3px solid #fab07a"
									: "",
							paddingLeft:
								activeInput === "confirmPassword" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-gray-400">Confirm Password</p>
						<input
							type="password"
							id="inputForm"
							name="confirmPassword"
							autoComplete="off"
						/>
					</div>

					<input
						type="submit"
						value="Submit"
						className="submitButton"
					/>
				</form>
			</div>
		</div>
	);
};

export default Register;
