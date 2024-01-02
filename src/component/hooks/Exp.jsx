import React from "react";

const Exp = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredItems = users.filter((it) =>
		it.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			{loading ? (
				<div className="h-[80vh]">
					<div className="flex flex-col items-center justify-center overflow-y-hidden text-[#a16c46]">
						<Loader className="w-20 h-20 animate-spin" />
						<p className="text-xl font-semibold">Loading...</p>
					</div>
				</div>
			) : users.length === 0 ? (
				<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
					<div className="flex flex-col items-center justify-center">
						<div>
							<UserX className="w-20 h-20 text-gray-700" />
						</div>
						<p className="text-lg font-semibold leading-6 text-gray-700">
							looks like there are no users.
						</p>
						<p>
							<small className="font-medium leading-5 text-gray-500 truncate">
								Click on the floating button below to add new
								user to database.
							</small>
						</p>
					</div>
				</div>
			) : (
				<div className="mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
					<Fade
						damping={0.3}
						cascade
						role="list"
						className="py-2 mx-3 space-y-2 divide-y divide-gray-100 md:mx-0"
					>
						{(searchQuery.length === 0 ? users : filteredItems)
							.length === 0 ? (
							<div className="flex items-center justify-center h-full px-4 py-2 mx-auto border max-w-prose bg-gray-200/70 border-yellow-900/20">
								<p className="text-lg font-semibold leading-6 text-gray-700">
									No users found.
								</p>
							</div>
						) : (
							(searchQuery.length === 0
								? users
								: filteredItems
							).map((us) => (
								<li
									key={us._id}
									className="flex justify-between px-4 pt-2 my-1 duration-200 bg-gray-200/70 gap-x-6 hover:bg-gray-300/70"
								>
									<div className="flex justify-between w-full pb-2 border-b border-yellow-900/20">
										<div className="flex items-center justify-start gap-3">
											<div>
												<Link
													to={`/userDetail/${us._id}`}
												>
													<p className="text-sm font-semibold leading-6 text-gray-700 hover:underline">
														{us.name}
													</p>
												</Link>
											</div>
										</div>
									</div>
								</li>
							))
						)}
					</Fade>
				</div>
			)}
		</div>
	);
};

export default Exp;
