import { Link, NavLink, Outlet } from "react-router-dom";
import cart from "../../assets/shopping-trolley.png";

const AuthPage = () => {
	return (
		<div className="h-screen overflow-hidden bg-[#161e31]">
			<div className="grid items-center relative justify-center grid-cols-1 mx-16 my-20  bg-[#2d3250] md:grid-cols-2 rounded-3xl shadow-xl drop-shadow-md">
				<div className="col-span-1 md:order-2">
					<img
						src={cart}
						alt=""
					/>
				</div>
				<div className="absolute top-8 left-12 authPage">
					<div className="space-x-3 text-lg font-semibold text-gray-500">
						<NavLink to="register">Register</NavLink>
						<NavLink to="login">Login</NavLink>
					</div>
				</div>
				<div className="col-span-1 border md:order-1 md:p-4">
					<div className="flex flex-row items-start justify-start gap-4">
						{/* <p>TechGearShop</p> */}
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
