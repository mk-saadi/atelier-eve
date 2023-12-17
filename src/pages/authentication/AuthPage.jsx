import { NavLink, Outlet } from "react-router-dom";
import shop from "../../assets/shop.avif";
import "./auth.css";
import { ErrorContext } from "../../component/hooks/ErrorContext";
import { useEffect, useState } from "react";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { Slide } from "react-awesome-reveal";

const AuthPage = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError("");
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			const timer = setTimeout(() => {
				setSuccess("");
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [success]);

	return (
		<div className="min-h-screen overflow-hidden bg-[#161e31] relative">
			{/* error toast */}
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

			<div className="grid  relative justify-center grid-cols-1 lg:mx-16 md:mx-8 lg:mt-16 xl:mt-20 md:mt-14 mx-3 mt-8 mb-4  bg-[#2d3250] lg:grid-cols-2 rounded-xl lg:rounded-2xl authShadow">
				<div className="hidden col-span-1 pointer-events-none select-none md:order-2 lg:block">
					<img
						src={shop}
						alt=""
						className="object-cover h-full rounded-e-2xl"
					/>
				</div>

				<div className="absolute top-8 md:left-8 left-4 lg:left-12 authPage">
					<div className="space-x-3 text-lg font-semibold text-gray-500">
						<NavLink to="register">Register</NavLink>
						<NavLink to="login">Login</NavLink>
					</div>
				</div>

				<div className="col-span-1 px-4 mt-24 md:order-1 lg:px-12 md:px-8 md:mt-20 lg:mt-20">
					<ErrorContext.Provider value={{ setError, setSuccess }}>
						<Outlet />
					</ErrorContext.Provider>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
