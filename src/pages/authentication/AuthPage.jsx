import { NavLink, Outlet } from "react-router-dom";
import cart from "../../assets/shopping-trolley.png";
import shop from "../../assets/shop.avif";
import "./auth.css";

const AuthPage = () => {
	return (
		<div className="min-h-screen overflow-hidden bg-[#161e31] relative">
			<div className="absolute flex justify-center w-full select-none top-4">
				<div className="">
					<p className="hidden font-[800] text-white uppercase opacity-40 md:block md:text-7xl xl:text-8xl">
						auth
					</p>
				</div>
			</div>

			<div className="grid  relative justify-center grid-cols-1 lg:mx-16 md:mx-8 lg:my-20 xl:my-24 md:mt-16 mx-3 my-8  bg-[#2d3250] lg:grid-cols-2 rounded-xl lg:rounded-2xl shadow-xl drop-shadow-md">
				<div className="hidden col-span-1 md:order-2 lg:block">
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
					{/* <p>TechGearShop</p> */}
					{/* <div className="flex flex-row items-start justify-start gap-4">
					</div> */}
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
