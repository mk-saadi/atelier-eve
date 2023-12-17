import { Link, NavLink, Outlet } from "react-router-dom";
import cart from "../../assets/shopping-trolley.png";
import "./auth.css";

const AuthPage = () => {
	return (
		<div className="h-screen overflow-hidden bg-[#161e31]">
			<div className="grid items-center relative justify-center grid-cols-1 lg:mx-16 md:mx-8 lg:my-20 md:my-14 mx-3 my-8  bg-[#2d3250] lg:grid-cols-2 rounded-xl lg:rounded-3xl shadow-xl drop-shadow-md">
				<div className="hidden col-span-1 md:order-2 lg:block">
					<img
						src={cart}
						alt=""
					/>
				</div>

				<div className="absolute top-8 md:left-8 left-4 lg:left-12 authPage">
					<div className="space-x-3 text-lg font-semibold text-gray-500">
						<NavLink to="register">Register</NavLink>
						<NavLink to="login">Login</NavLink>
					</div>
				</div>

				<div className="col-span-1 px-4 mt-24 md:order-1 lg:px-12 md:px-8 md:mt-20 lg:mt-0">
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
