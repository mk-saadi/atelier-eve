/* eslint-disable react/prop-types */
import axios from "axios";

const Comment = ({ id, product }) => {
	const comment = product?.comments;

	const handleComment = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const commentBody = form.body.value;
		const rating = parseFloat(form.rating.value);

		const commentDoc = {
			name,
			email,
			commentBody,
			rating,
		};

		axios
			.post(`http://localhost:2000/products/${id}/comments`, commentDoc)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<>
			<div className="bg-red-400/30">
				<form onSubmit={handleComment}>
					<input
						type="text"
						name="name"
						placeholder="name"
					/>
					<input
						type="email"
						placeholder="email"
						name="email"
					/>
					<textarea
						name="body"
						id=""
						cols="30"
						rows="10"
					></textarea>
					<input
						type="number"
						name="rating"
						placeholder="rate"
						id=""
					/>
					<input
						type="submit"
						value="submit"
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
