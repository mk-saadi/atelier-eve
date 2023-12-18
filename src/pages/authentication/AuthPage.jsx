// import { NavLink, Outlet } from "react-router-dom";
// import shop from "../../assets/shop.avif";
// import "./auth.css";
// import Navbar from "../../component/shared/Navbar";
// import { useEffect, useState } from "react";
// import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
// import { Slide } from "react-awesome-reveal";
// import { ErrorContext } from "../../component/hooks/ErrorContext";

// const AuthPage = () => {
// 	const [loading, setLoading] = useState("");
// 	const [error, setError] = useState("");
// 	const [success, setSuccess] = useState("");

// useEffect(() => {
// 	if (error) {
// 		const timer = setTimeout(() => {
// 			setError("");
// 		}, 3000);

// 		return () => clearTimeout(timer);
// 	}
// }, [error]);

// useEffect(() => {
// 	if (success) {
// 		const timer = setTimeout(() => {
// 			setSuccess("");
// 		}, 3000);

// 		return () => clearTimeout(timer);
// 	}
// }, [success]);

// useEffect(() => {
// 	if (loading) {
// 		const timer = setTimeout(() => {
// 			setLoading("");
// 		}, 3000);

// 		return () => clearTimeout(timer);
// 	}
// }, [loading]);

// 	return (
// 		<>
// 			<div className="block lg:hidden">
// 				<Navbar />
// 			</div>
// 			<div className="min-h-screen overflow-hidden bg-[#161e31] relative grid items-center md:block">
// 				{/* error toast */}
// 				{error && (
// 					<Slide
// 						className="absolute z-50 flex justify-center w-full text-lg text-red-400 top-8"
// 						direction="down"
// 					>
// 						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-red-400 rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
// 							<BadgeAlert />
// 							{error}
// 						</p>
// 					</Slide>
// 				)}
// 				{success && (
// 					<Slide
// 						className="absolute z-50 flex justify-center w-full text-lg text-[#16a34a] top-8"
// 						direction="down"
// 					>
// 						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#16a34a] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
// 							<BadgeCheck />
// 							{success}
// 						</p>
// 					</Slide>
// 				)}
// 				{loading && (
// 					<Slide
// 						className="absolute z-50 flex justify-center w-full text-lg text-[#fab07a] top-8"
// 						direction="down"
// 					>
// 						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#a16c46] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
// 							<Loader className="animate-spin" />
// 							{loading}
// 						</p>
// 					</Slide>
// 				)}

// 				<div className="absolute flex justify-center w-full select-none top-1">
// 					<div className="">
// 						<p className="hidden font-[800] text-white uppercase opacity-40 md:block md:text-7xl xl:text-8xl">
// 							authentication
// 						</p>
// 					</div>
// 				</div>

// 				<div className="grid  relative justify-center grid-cols-1 lg:mx-16 md:mx-8  xl:mt-20 md:mt-16 mx-3 mb-4  bg-[#2d3250] lg:grid-cols-2 rounded-xl lg:rounded-2xl authShadow">
// 					<div className="hidden col-span-1 pointer-events-none select-none md:order-2 lg:block">
// 						<img
// 							src={shop}
// 							alt=""
// 							className="object-cover lg:h-[33rem] rounded-e-2xl"
// 						/>
// 					</div>

// 					<div className="absolute top-8 md:left-8 left-4 lg:left-12 authPage">
// 						<div className="space-x-3 text-lg font-semibold text-gray-500">
// 							<NavLink to="register">Register</NavLink>
// 							<NavLink to="login">Login</NavLink>
// 						</div>
// 					</div>

// 					<div className="col-span-1 px-4 mt-24 md:order-1 lg:px-12 md:px-8 md:mt-20 lg:mt-20">
// 						<ErrorContext.Provider
// 							value={{ setError, setSuccess, setLoading }}
// 						>
// 							<Outlet />
// 						</ErrorContext.Provider>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default AuthPage;

import { NavLink, Outlet } from "react-router-dom";
import shop from "../../assets/shop.avif";
import "./auth.css";
import Navbar from "../../component/shared/Navbar";
import { useEffect, useState } from "react";
import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { Slide } from "react-awesome-reveal";
import { ErrorContext } from "../../component/hooks/ErrorContext";

const AuthPage = () => {
	const [loading, setLoading] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const showToast = (type, message) => {
		// Close all currently active toasts
		setLoading("");
		setError("");
		setSuccess("");

		// Set the new toast
		if (type === "loading") setLoading(message);
		else if (type === "error") setError(message);
		else if (type === "success") setSuccess(message);

		// Automatically close the toast after 3 seconds
		setTimeout(() => {
			if (type === "loading") setLoading("");
			else if (type === "error") setError("");
			else if (type === "success") setSuccess("");
		}, 3000);
	};
	return (
		<>
			<div className="block lg:hidden">
				<Navbar />
			</div>
			<div className="min-h-screen overflow-hidden bg-[#161e31] relative grid items-center md:block">
				{/* error toast */}
				{/* {error && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-red-400 top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-red-400 rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<BadgeAlert />
							{error}
						</p>
					</Slide>
				)}
				{success && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-[#16a34a] top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#16a34a] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<BadgeCheck />
							{success}
						</p>
					</Slide>
				)}
				{loading && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-[#fab07a] top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#a16c46] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<Loader className="animate-spin" />
							{loading}
						</p>
					</Slide>
				)} */}

				{loading && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-[#fab07a] top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#a16c46] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<Loader className="animate-spin" />
							{loading}
						</p>
					</Slide>
				)}

				{error && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-red-400 top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-red-400 rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<BadgeAlert />
							{error}
						</p>
					</Slide>
				)}

				{success && (
					<Slide
						className="absolute z-50 flex justify-center w-full text-lg text-[#16a34a] top-8"
						direction="down"
					>
						<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold bg-white border-2 border-[#16a34a] rounded-md shadow-md opacity-100 drop-shadow-md gap-x-4">
							<BadgeCheck />
							{success}
						</p>
					</Slide>
				)}

				<div className="absolute flex justify-center w-full select-none top-1">
					<div className="">
						<p className="hidden font-[800] text-white uppercase opacity-40 md:block md:text-7xl xl:text-8xl">
							authentication
						</p>
					</div>
				</div>

				<div className="grid  relative justify-center grid-cols-1 lg:mx-16 md:mx-8  xl:mt-20 md:mt-16 mx-3 mb-4  bg-[#2d3250] lg:grid-cols-2 rounded-xl lg:rounded-2xl authShadow">
					<div className="hidden col-span-1 pointer-events-none select-none md:order-2 lg:block">
						<img
							src={shop}
							alt=""
							className="object-cover lg:h-[33rem] rounded-e-2xl"
						/>
					</div>

					<div className="absolute top-8 md:left-8 left-4 lg:left-12 authPage">
						<div className="space-x-3 text-lg font-semibold text-gray-500">
							<NavLink to="register">Register</NavLink>
							<NavLink to="login">Login</NavLink>
						</div>
					</div>

					<div className="col-span-1 px-4 mt-24 md:order-1 lg:px-12 md:px-8 md:mt-20 lg:mt-20">
						<ErrorContext.Provider
							value={{
								setError,
								setSuccess,
								setLoading,
							}}
						>
							<Outlet />
						</ErrorContext.Provider>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthPage;
