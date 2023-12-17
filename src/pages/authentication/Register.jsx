import { useContext, useState } from "react";
import { AuthContext } from "../../provide/AuthProvider";
import "./auth.css";
import axios from "axios";
import { Eye, EyeOff, ImagePlus } from "lucide-react";
import imageCompression from "browser-image-compression";
import { storage } from "../../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
	const { signUp, updateProfileInfo } = useContext(AuthContext);
	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";

	const [activeInput, setActiveInput] = useState("");

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	const handleSignUp = async (event) => {
		event.preventDefault();

		const form = event.target;
		const image = form.image.files[0];
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;

		signUp(email, password)
			.then((res) => {
				// Create a storage reference
				const storageRef = ref(storage, email);
				// Upload the file to the new reference
				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Handle the upload task progress here
						console.log(
							"Upload is " +
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
									100 +
								"% done"
						);
					},
					(error) => {
						// Handle the error here
						console.log(error.message);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								console.log("File available at", downloadURL);
								// Update the user document with the download URL of the image
								const userDocument = {
									photo: downloadURL,
									name: name,
									email: email,
								};
								console.log(userDocument);
								updateProfileInfo(name, downloadURL);
							}
						);
					}
				);
			})
			.catch((error) => {
				console.log(error.message);
				alert(`${error.message}`);
			});
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
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
						<p className="text-sm font-medium text-gray-400">
							Your Name
						</p>
						<input
							type="text"
							id="inputForm"
							name="name"
							required
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
						<p className="text-sm font-medium text-gray-400">
							Your Photo
						</p>

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
							name="image"
							accept="image/*"
							onChange={handleChange}
							style={{ display: "none" }}
							required
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
						<p className="text-sm font-medium text-gray-400">
							Your Email
						</p>
						<input
							type="text"
							id="inputForm"
							name="email"
							required
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
						<p className="text-sm font-medium text-gray-400">
							Password
						</p>
						<div className="flex">
							<input
								id="inputForm"
								name="password"
								autoComplete="off"
								required
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
								activeInput === "confirm"
									? "3px solid #fab07a"
									: "",
							paddingLeft: activeInput === "confirm" ? "7px" : "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
						id="parag"
						tabIndex={1}
					>
						<p className="text-sm font-medium text-gray-400">
							Confirm Password
						</p>
						<div className="flex">
							<input
								type={showPassword ? "text" : "password"}
								id="inputForm"
								name="confirm"
								autoComplete="off"
								required
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
