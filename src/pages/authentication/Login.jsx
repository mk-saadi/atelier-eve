import { useContext, useState, Fragment } from "react";
import useToast from "../../component/hooks/useToast";
import Toast from "../../component/hooks/Toast";
import { CheckSquare2, Eye, EyeOff, Loader, Square } from "lucide-react";
import { AuthContext } from "../../provide/AuthProvider";
import { Chip, Divider } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
// import { space } from "postcss/lib/list";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const { toastType, toastMessage, showToast, hideToast } = useToast();
	const [activeInput, setActiveInput] = useState("");
	const [isToggled, setIsToggled] = useState(false);
	const navigate = useNavigate();

	const handleClick = () => {
		setIsToggled(!isToggled);
	};

	const handleFocus = (e) => {
		setActiveInput(e.target.name);
	};

	const handleBlur = () => {
		setActiveInput("");
	};

	const handleLogin = (event) => {
		event.preventDefault();
		showToast("loading", "Please wait!");

		const form = event.target;
		const email = form.email.value;
		const passwordInput = form.password;
		const password = passwordInput.value;

		if (password.length < 8) {
			showToast("error", "password must be at least 8 characters");
			passwordInput.value = "";
			return;
		}

		signIn(email, password)
			.then((res) => {
				const user = res.user;
				if (user.uid) {
					showToast(
						"success",
						`successfully signed in as ${user.displayName}`
					);
					form.reset();

					setTimeout(() => {
						navigate("/");
					}, 1500);
				}
			})
			.catch((error) => {
				console.log("error: ", error);

				showToast("error", "Error, please try again");
			});
	};
	const [isOpen, setIsOpen] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<Fade
				cascade
				direction="up"
			>
				<form
					onSubmit={handleLogin}
					className="flex flex-col w-full gap-y-1.5"
				>
					<Fade
						cascade
						direction="up"
					>
						<div
							className="bg-[#42486a]"
							style={{
								borderLeft:
									activeInput === "email"
										? "3px solid #fab07a"
										: "",
								paddingLeft:
									activeInput === "email" ? "7px" : "",
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

						<div className="flex items-center justify-between w-full">
							<div className="flex items-center justify-start gap-3 mt-4 text-gray-300">
								<span
									className="cursor-pointer text-[#fab07a] duration-200"
									onClick={handleClick}
								>
									{isToggled ? (
										<CheckSquare2 />
									) : (
										<Square className="text-gray-300" />
									)}
								</span>{" "}
								Remember Me
							</div>

							<div>
								<button
									onClick={openModal}
									className="font-medium text-gray-300 cursor-pointer hover:underline"
								>
									forgot password?
								</button>
							</div>
						</div>
					</Fade>
					<input
						type="submit"
						value="Submit"
						className="submitButton"
					/>
				</form>

				<div>
					<Divider>
						<Chip
							label="OR"
							sx={{ color: "white", fontFamily: "Dosis" }}
						/>
					</Divider>
				</div>

				<div className="flex items-center justify-start my-8">
					<p className="mr-16 text-xl font-semibold text-gray-300">
						Login with your
					</p>
					<div className="text-[#fab07a] flex justify-center items-center gap-4 text-2xl">
						<button>
							<FaGoogle />
						</button>
						<button>
							<FaSquareFacebook />
						</button>
					</div>
				</div>

				<Transition
					appear
					show={isOpen}
					as={Fragment}
				>
					<Dialog
						as="div"
						className="relative z-10"
						onClose={closeModal}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black/25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex items-center justify-center min-h-full p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-[#2d3250] authShadow rounded-xl">
										<Dialog.Title
											as="h2"
											className="text-xl font-medium leading-6 text-gray-300"
										>
											Forgot your password?
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-base text-gray-500">
												Enter your registered email
												below. We will send a mail to
												you to get your password reset.
											</p>
										</div>

										<div
											className="bg-[#42486a] mt-4"
											style={{
												borderLeft:
													activeInput === "emails"
														? "3px solid #fab07a"
														: "",
												paddingLeft:
													activeInput === "emails"
														? "7px"
														: "",
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
												name="emails"
												required
											/>
										</div>

										<div className="mt-4">
											<button
												type="button"
												className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={closeModal}
											>
												Got it, thanks!
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</Fade>
		</>
	);
};

export default Login;
