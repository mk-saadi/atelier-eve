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
						// className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						className="flex-shrink-0 w-6 h-6 text-gray-400 hover:text-[#278277] duration-200"
					>
						{/* {anchor} */}

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
