/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// const cartReducer = (state, action) => {
// 	switch (action.type) {
// 		case "ADD_TO_CART": {
// 			const updatedCart = [...state.cartItems, action.payload];
// 			// Save updated cart to localStorage
// 			localStorage.setItem("cartItems-atelier", JSON.stringify(updatedCart));
// 			return {
// 				...state,
// 				cartItems: updatedCart,
// 			};
// 		}
// 		// Add more cases for other actions
// 		default:
// 			return state;
// 	}
// };

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { productId } = action.payload;

			// Check if the product with the same id already exists in the cart
			const existingProductIndex = state.cartItems.findIndex((item) => item.productId === productId);

			if (existingProductIndex !== -1) {
				// Product with the same id already exists, update quantity or take other action
				const updatedCart = [...state.cartItems];
				updatedCart[existingProductIndex].quantity += 1; // Update quantity (or take other action)

				// Save updated cart to localStorage
				localStorage.setItem("cartItems-atelier", JSON.stringify(updatedCart));

				return {
					...state,
					cartItems: updatedCart,
				};
			} else {
				// Product with the same id doesn't exist, add it to the cart
				const updatedCart = [...state.cartItems, action.payload];

				// Save updated cart to localStorage
				localStorage.setItem("cartItems-atelier", JSON.stringify(updatedCart));

				return {
					...state,
					cartItems: updatedCart,
				};
			}
		}
		case "REMOVE_FROM_CART": {
			const updatedCart = state.cartItems.filter((item) => item.productId !== action.payload);
			localStorage.setItem("cartItems-atelier", JSON.stringify(updatedCart));
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
	const storedCartItems = JSON.parse(localStorage.getItem("cartItems-atelier")) || [];
	const [state, dispatch] = useReducer(cartReducer, {
		cartItems: storedCartItems,
	});

	const addToCart = (item) => {
		dispatch({ type: "ADD_TO_CART", payload: item });
	};
	// Add more functions for other actions

	// useEffect to update localStorage when cartItems change
	useEffect(() => {
		localStorage.setItem("cartItems-atelier", JSON.stringify(state.cartItems));
	}, [state.cartItems]);

	return <CartContext.Provider value={{ ...state, addToCart, dispatch }}>{children}</CartContext.Provider>;
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCart };
