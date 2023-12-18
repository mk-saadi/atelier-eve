import { useContext } from "react";
import { AuthContext } from "../../provide/AuthProvider";

const AddProducts = () => {
	const { user } = useContext(AuthContext);
	return <div></div>;
};

export default AddProducts;
