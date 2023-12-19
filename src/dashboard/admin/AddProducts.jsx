import { useContext, useState } from "react";
import { AuthContext } from "../../provide/AuthProvider";
// import { ChevronDown } from '@heroicons/react/20/solid'
import { Switch } from "@headlessui/react";
import { ChevronDown, Image, PhoneOutgoingIcon } from "lucide-react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const AddProducts = () => {
	const { user } = useContext(AuthContext);
	const [agreed, setAgreed] = useState(false);

	const handleProduct = (e) => {
		e.preventDefault();

		console.log("e", e);
	};

	return (
		<div className="px-6 py-24 bg-white isolate sm:py-32 lg:px-8">
			<div
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
				aria-hidden="true"
			>
				<div
					className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="max-w-2xl mx-auto text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
					Add new product
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-500">
					Aute magna irure deserunt veniam aliqua magna enim
					voluptate.
				</p>
			</div>
			<form
				action="#"
				method="POST"
				onSubmit={handleProduct}
				className="max-w-xl mx-auto mt-16 sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="productName"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Product Name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="productName"
								id="productName"
								autoComplete="product-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Last name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="last-name"
								id="last-name"
								autoComplete="family-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="company"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Company
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="company"
								id="company"
								autoComplete="organization"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					{/* upload photo */}
					<div className="col-span-full">
						<label
							htmlFor="cover-photo"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Cover photo
						</label>
						<div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
							<div className="text-center">
								<Image
									className="w-12 h-12 mx-auto text-gray-300"
									aria-hidden="true"
								/>
								<div className="flex mt-4 text-sm leading-6 text-gray-600">
									<label
										htmlFor="file-upload"
										className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
									>
										<span>Upload a file</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											className="sr-only"
										/>
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p className="text-xs leading-5 text-gray-600">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="phone-number"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Phone number
						</label>
						<div className="relative mt-2.5">
							<div className="absolute inset-y-0 left-0 flex items-center">
								<label
									htmlFor="country"
									className="sr-only"
								>
									Country
								</label>
								<select
									id="country"
									name="country"
									className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm"
								>
									<option>US</option>
									<option>CA</option>
									<option>EU</option>
								</select>
								{/* <ChevronDown
									className="absolute top-0 left-0 w-5 h-full text-gray-400 pointer-events-none"
									aria-hidden="true"
								/> */}
							</div>
							<input
								type="tel"
								name="phone-number"
								id="phone-number"
								autoComplete="tel"
								className="block w-full rounded-md border-0 px-3.5 py-2 pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm font-semibold leading-6 text-gray-900"
						>
							Message
						</label>
						<div className="mt-2.5">
							<textarea
								name="message"
								id="message"
								rows={4}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none sm:text-sm sm:leading-6"
								defaultValue={""}
							/>
						</div>
					</div>
					<Switch.Group
						as="div"
						className="flex gap-x-4 sm:col-span-2"
					>
						<div className="flex items-center h-6">
							<Switch
								checked={agreed}
								onChange={setAgreed}
								className={classNames(
									agreed
										? " bg-[#fab07a] focus:outline-none"
										: "bg-gray-200",
									"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fab07a]"
								)}
							>
								<span className="sr-only">
									Agree to policies
								</span>
								<span
									aria-hidden="true"
									className={classNames(
										agreed
											? "translate-x-3.5"
											: "translate-x-0",
										"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
									)}
								/>
							</Switch>
						</div>
						<Switch.Label className="text-sm leading-6 text-gray-600">
							By selecting this, you agree to our{" "}
							<a
								href="#"
								className="font-semibold text-indigo-600"
							>
								privacy&nbsp;policy
							</a>
							.
						</Switch.Label>
					</Switch.Group>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Let's talk
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddProducts;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
