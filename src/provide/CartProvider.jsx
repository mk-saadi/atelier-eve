/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { productId } = action.payload;

			const existingProductIndex = state.cartItems.findIndex((item) => item.productId === productId);

			if (existingProductIndex !== -1) {
				const updatedCart = [...state.cartItems];
				updatedCart[existingProductIndex].quantity += 1;

				localStorage.setItem("cartItems-atelier", JSON.stringify(updatedCart));

				return {
					...state,
					cartItems: updatedCart,
				};
			} else {
				const updatedCart = [...state.cartItems, action.payload];

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
