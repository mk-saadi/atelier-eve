import { Outlet } from "react-router-dom";
import Navbar from "../component/shared/Navbar";

const Main = () => {
	return (
		<div>
			<div className="sticky top-0">
				<Navbar />
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Main;
