import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
	const [state, setState] = React.useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	return (
		<div>
			{["right"].map((anchor) => (
				<React.Fragment key={anchor}>
					<button
						onClick={toggleDrawer(anchor, true)}
						className="relative bg-transparent rounded-full text-gray-900/80 hover:text-[#fab07a] duration-200 focus:outline-none"
						// className="flex-shrink-0 w-6 h-6 text-gray-900/80 hover:text-[#fab07a] duration-200"
					>
						<ShoppingBag />
					</button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{/* {list(anchor)} */}
						<div>
							<p>
								this is inside the drawer this is inside the
								drawer
							</p>
						</div>
						<Divider />
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
};

export default Cart;
