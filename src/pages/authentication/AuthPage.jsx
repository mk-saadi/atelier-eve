import { Link, Outlet } from "react-router-dom";
import cart from "../../assets/shopping-trolley.png";

const AuthPage = () => {
	return (
		<div className="h-screen overflow-hidden bg-gray-500">
			<div className="grid items-center justify-center grid-cols-1 mx-16 my-20 bg-gray-200 md:grid-cols-2">
				<div className="md:order-2">
					<img
						src={cart}
						alt=""
					/>
				</div>
				<div className="md:order-1 md:p-4">
					<div className="flex flex-row items-start justify-start gap-4">
						<Link to="register">Register</Link>
						<Link to="auth">Login</Link>
						<p>TechGearShop</p>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
