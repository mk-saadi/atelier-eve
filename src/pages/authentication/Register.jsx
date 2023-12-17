import { useContext, useState } from "react";
import { AuthContext } from "../../provide/AuthProvider";
import "./auth.css";

const Register = () => {
	const { signUp } = useContext(AuthContext);

	const [activeInput, setActiveInput] = useState("");

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	return (
		<div>
			<div>
				<form
					action=""
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
						<p className="text-gray-500">Your Name</p>
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
						<p className="text-gray-500">Your Email</p>
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
						<p className="text-gray-500">Password</p>
						<input
							type="password"
							id="inputForm"
							name="password"
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
