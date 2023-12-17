import { useContext, useState } from "react";
import { AuthContext } from "../../provide/AuthProvider";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const Register = () => {
	const { signUp } = useContext(AuthContext);
	const [isActive, setIsActive] = useState(false);
	const [isActive2, setIsActive2] = useState(false);
	const [isActive3, setIsActive3] = useState(false);

	const [activeInput, setActiveInput] = useState("");

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	return (
		<div>
			{/* <Box
				component="form"
				sx={{
					"& > :not(style)": {
						m: 1,
						width: "25ch",
					},
					"& .MuiFormControl-filled": {
						// Target the filled modifier class
						backgroundColor: "transparent",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="filled-basic"
					label="Filled"
					variant="filled"
				/>
			</Box> */}

			<div>
				<form
					action=""
					className="flex flex-col w-full gap-2"
				>
					<input
						type="text"
						id="inputForm"
						name="name"
						// style={{
						// 	borderLeft:
						// 		activeInput === "name" ? "4px solid #000" : "",
						// }}
						style={{
							borderLeft:
								activeInput === "name"
									? "3px solid #fab07a"
									: "none",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<input
						type="text"
						id="inputForm"
						name="email"
						style={{
							borderLeft:
								activeInput === "email"
									? "3px solid #fab07a"
									: "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<input
						type="text"
						id="inputForm"
						name="password"
						style={{
							borderLeft:
								activeInput === "password"
									? "3px solid #fab07a"
									: "",
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>

					<input
						type="submit"
						value="Submit"
						className="px-8 py-2 mt-4 duration-200 rounded-lg outline-none cursor-pointer submitButton w-fit hover:scale-95"
					/>
				</form>
				{/* <form
					action=""
					className="flex flex-col w-full gap-2"
				>
					<input
						type="text"
						id="inputForm"
						name="name"
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
						style={{
							backgroundColor: isActive
								? "rgba(0, 0, 0, 0.1)"
								: "rgba(90, 90, 90, 0.473)",
							borderRadius: "2.5px 2.5px 0px 2.5px",
							borderBottom: "1px solid white",
							outline: "none",
							padding: "3px 10px",
							caretColor: "#16a34a",
							color: "#fff",
							borderLeft: isActive ? "5px solid #16a34a" : "none", // Use conditional styles
						}}
					/>
					<input
						type="text"
						id="inputForm"
						name="email"
						onFocus={() => setIsActive2(true)}
						onBlur={() => setIsActive2(false)}
						style={{
							backgroundColor: isActive2
								? "rgba(0, 0, 0, 0.1)"
								: "rgba(90, 90, 90, 0.473)",
							borderRadius: "2.5px 2.5px 0px 2.5px",
							borderBottom: "1px solid white",
							outline: "none",
							padding: "3px 10px",
							caretColor: "#16a34a",
							color: "#fff",
							borderLeft: isActive2
								? "5px solid #16a34a"
								: "none", // Use conditional styles
						}}
					/>
					<input
						type="text"
						id="inputForm"
						onFocus={() => setIsActive3(true)}
						onBlur={() => setIsActive3(false)}
						style={{
							backgroundColor: isActive3
								? "rgba(0, 0, 0, 0.1)"
								: "rgba(90, 90, 90, 0.473)",
							borderRadius: "2.5px 2.5px 0px 2.5px",
							borderBottom: "1px solid white",
							outline: "none",
							padding: "3px 10px",
							caretColor: "#16a34a",
							color: "#fff",
							borderLeft: isActive3
								? "5px solid #16a34a"
								: "none", // Use conditional styles
						}}
					/>
				</form> */}
			</div>
		</div>
	);
};

export default Register;
