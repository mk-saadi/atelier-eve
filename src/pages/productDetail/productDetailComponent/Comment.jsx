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
			<div className="bg-red-400/30">
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
						placeholder="name"
						className="w-full focus:outline-none"
					/>

					<textarea
						name="body"
						id=""
						cols="30"
						rows="10"
					></textarea>

					<input
						type="submit"
						value="Submit"
						className="inline-flex justify-center px-4 py-2 mt-4 text-base font-semibold text-orange-600 duration-200 bg-orange-300 border-none rounded-lg shadow-lg outline-none cursor-pointer w-fit active:scale-95 hover:bg-orange-300 shadow-gray-700/30"
					/>
				</form>
			</div>

			<div className="bg-sky-400/30">
				{comment?.length === undefined ? (
					<div>no comments yet</div>
				) : (
					comment?.map((ca) => (
						<div key={ca.name}>
							<p>{ca.commentBody}</p>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Comment;
