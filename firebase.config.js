import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDy3yy0XMYLn8G7uTPF4jZ3h3jXD_a4kKM",
	authDomain: "next-pro-8e9af.firebaseapp.com",
	projectId: "next-pro-8e9af",
	storageBucket: "next-pro-8e9af.appspot.com",
	messagingSenderId: "835027739838",
	appId: "1:835027739838:web:5c4444df64a6e68fbf2aef",
};

const app = initializeApp(firebaseConfig);

export default app;
export const storage = getStorage();
