// import { createContext, useContext, useReducer } from "react";

// const CartContext = createContext();

// const cartReducer = (state, action) => {
// 	switch (action.type) {
// 		case "ADD_TO_CART":
// 			return {
// 				...state,
// 				cartItems: [...state.cartItems, action.payload],
// 			};
// 		// Add more cases for other actions
// 		default:
// 			return state;
// 	}
// };

// const CartProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

// 	const addToCart = (item) => {
// 		dispatch({ type: "ADD_TO_CART", payload: item });
// 	};
// 	// Add more functions for other actions

// 	return (
// 		<CartContext.Provider value={{ ...state, addToCart }}>
// 			{children}
// 		</CartContext.Provider>
// 	);
// };

// const useCart = () => {
// 	const context = useContext(CartContext);
// 	if (!context) {
// 		throw new Error("useCart must be used within a CartProvider");
// 	}
// 	return context;
// };

// export { CartProvider, useCart };

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const updatedCart = [...state.cartItems, action.payload];
			// Save updated cart to localStorage
			localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			return {
				...state,
				cartItems: updatedCart,
			};
		}
		// Add more cases for other actions
		default:
			return state;
	}
};

const CartProvider = ({ children }) => {
	const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
	const [state, dispatch] = useReducer(cartReducer, {
		cartItems: storedCartItems,
	});

	const addToCart = (item) => {
		dispatch({ type: "ADD_TO_CART", payload: item });
	};
	// Add more functions for other actions

	// useEffect to update localStorage when cartItems change
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
	}, [state.cartItems]);

	return (
		<CartContext.Provider value={{ ...state, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCart };
