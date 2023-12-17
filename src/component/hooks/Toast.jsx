import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { useEffect } from "react";
import { Slide } from "react-awesome-reveal";

// eslint-disable-next-line react/prop-types
const Toast = ({ type, message, onHide }) => {
	const toastClasses = {
		success: "border-2 border-[#16a34a] text-[#16a34a]",
		error: "border-2 border-red-400 text-red-400",
		loading: "border-2 border-[#a16c46] text-[#fab07a]",
	};

	let iconComponent;

	switch (type) {
		case "success":
			iconComponent = <BadgeCheck />;
			break;
		case "error":
			iconComponent = <BadgeAlert />;
			break;
		case "loading":
			iconComponent = <Loader className="animate-spin" />;
			break;
		default:
			iconComponent = null;
	}

	useEffect(() => {
		const timeoutId = setTimeout(onHide, 3000);
		return () => clearTimeout(timeoutId);
	}, [onHide]);

	return (
		<Slide
			className="absolute z-50 flex justify-center w-full text-lg top-8"
			direction="down"
		>
			<div
				className={` bg-white  font-extrabold rounded-md shadow-md ${toastClasses[type]}`}
				// className={`alert bg-white font-semi rounded-md shadow-md ${toastClasses[type]}`}
			>
				<p className="flex flex-row items-center justify-center px-4 py-4 font-semibold gap-x-4">
					{iconComponent}
					{message}
				</p>
			</div>
		</Slide>
	);
};

export default Toast;

// {
// 	badge;
// }
// const badge = {
// 	errorBadge: <BadgeAlert />,
// 	successBadge: <BadgeCheck />,
// 	loadingBadge: <Loader className="animate-spin" />,
// };
