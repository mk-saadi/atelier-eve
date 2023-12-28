import { Outlet } from "react-router-dom";
import NavbarS from "../component/shared/NavbarS";

const Main = () => {
	return (
		<div>
			<div className="sticky top-0 z-50">
				<NavbarS />
			</div>

			<div className=" bg-[#fff9e9]">
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
