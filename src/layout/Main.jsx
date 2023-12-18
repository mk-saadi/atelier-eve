import { Outlet } from "react-router-dom";
import Navbar from "../component/shared/Navbar";
import NavbarS from "../component/shared/NavbarS";

const Main = () => {
	return (
		<div>
			<div className="sticky top-0 z-50">
				<NavbarS />
			</div>

			<div className=" bg-[#2d3250]">
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
