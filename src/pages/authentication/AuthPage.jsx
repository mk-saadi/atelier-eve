import { NavLink, Outlet } from "react-router-dom";
import shop from "../../assets/shop.avif";
import "./auth.css";
import Navbar from "../../component/shared/Navbar";

const AuthPage = () => {
	return (
		<>
			<div className="block lg:hidden">
				<Navbar />
			</div>
			<div className="min-h-screen overflow-hidden bg-[#161e31] relative grid items-center md:block">
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
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthPage;
