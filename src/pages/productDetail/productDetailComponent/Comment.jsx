/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provide/AuthProvider";
import { useNavigate } from "react-router-dom";
import useToast from "../../../component/hooks/useToast";
import Toast from "../../../component/hooks/Toast";

const Comment = ({ id, product }) => {
	const comment = product?.comments;
	const [rate, setRate] = useState([]);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { toastType, toastMessage, showToast, hideToast } = useToast();

	useEffect(() => {
		try {
			const productRating = comment.map((ca) => ca?.rating);
			setRate(productRating);
		} catch (error) {
			console.log("productRating: ", error);
		}
	}, [comment]);

	const handleComment = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const commentBody = form.body.value;
		const rating = parseFloat(form.rating.value);

		const commentDoc = {
			name,
			commentBody,
			rating,
		};

		if (user) {
			axios
				.post(`http://localhost:2000/products/${id}/comments`, commentDoc)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			showToast("error", "Please login first.");

			setTimeout(() => {
				showToast("loading", "Redirecting");
				setTimeout(() => {
					navigate("/auth/login");
				}, 500);
			}, 2000);
		}
	};

	return (
		<>
			{toastType && (
				<Toast
					type={toastType}
					message={toastMessage}
					onHide={hideToast}
				/>
			)}
			<div className="bg-white">
				<form
					onSubmit={handleComment}
					className="flex flex-col space-y-2.5"
				>
					<input
						type="number"
						name="rating"
						placeholder="rate"
						className=""
					/>

					<input
						type="text"
						name="name"
						required
						placeholder="name"
						className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 bg-white"
					/>

					<textarea
						name="body"
						required
						className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
					></textarea>

					<div className="flex justify-end w-full">
						<input
							type="submit"
							value="Submit"
							className="inline-flex justify-center px-4 py-1 text-base font-semibold text-orange-600 duration-200 bg-orange-300 border-none rounded-lg shadow-lg outline-none cursor-pointer md:py-2 md:px-7 w-fit active:scale-95 hover:bg-orange-300 shadow-gray-700/30"
						/>
					</div>
				</form>
			</div>

			<div className="flex flex-col">
				{comment?.length === undefined ? (
					<div>no comments yet</div>
				) : (
					comment?.map((ca) => (
						<div
							key={ca.name}
							className="my-2.5"
						>
							<p>{ca.name}</p>
							<p>{ca.commentBody}</p>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Comment;
