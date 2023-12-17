// import { useState } from "react";
// import Add from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
// 	const [err, setErr] = useState(false);
// 	const [loading, setLoading] = useState(false);
// 	const navigate = useNavigate();

// 	const handleSubmit = async (e) => {
// 		setLoading(true);
// 		e.preventDefault();
// 		const displayName = e.target[0].value;
// 		const email = e.target[1].value;
// 		const password = e.target[2].value;
// 		const file = e.target[3].files[0];

// 		try {
// 			//Create user
// 			const res = await createUserWithEmailAndPassword(
// 				auth,
// 				email,
// 				password
// 			);

// 			//Create a unique image name
// 			const date = new Date().getTime();
// 			const storageRef = ref(storage, `${displayName + date}`);

// 			await uploadBytesResumable(storageRef, file).then(() => {
// 				getDownloadURL(storageRef).then(async (downloadURL) => {
// 					try {
// 						//Update profile
// 						await updateProfile(res.user, {
// 							displayName,
// 							photoURL: downloadURL,
// 						});
// 						//create user on firestore
// 						await setDoc(doc(db, "users", res.user.uid), {
// 							uid: res.user.uid,
// 							displayName,
// 							email,
// 							photoURL: downloadURL,
// 						});

// 						//create empty user chats on firestore
// 						await setDoc(doc(db, "userChats", res.user.uid), {});
// 						navigate("/");
// 					} catch (err) {
// 						console.log(err);
// 						setErr(true);
// 						setLoading(false);
// 					}
// 				});
// 			});
// 		} catch (err) {
// 			setErr(true);
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="formContainer">
// 			<div className="formWrapper">
// 				<span className="logo">Lama Chat</span>
// 				<span className="title">Register</span>
// 				<form onSubmit={handleSubmit}>
// 					<input
// 						required
// 						type="text"
// 						placeholder="display name"
// 					/>
// 					<input
// 						required
// 						type="email"
// 						placeholder="email"
// 					/>
// 					<input
// 						required
// 						type="password"
// 						placeholder="password"
// 					/>
// 					<input
// 						required
// 						style={{ display: "none" }}
// 						type="file"
// 						id="file"
// 					/>
// 					<label htmlFor="file">
// 						<img
// 							src={Add}
// 							alt=""
// 						/>
// 						<span>Add an avatar</span>
// 					</label>
// 					<button disabled={loading}>Sign up</button>
// 					{loading &&
// 						"Uploading and compressing the image please wait..."}
// 					{err && <span>Something went wrong</span>}
// 				</form>
// 				<p>
// 					You do have an account? <Link to="/register">Login</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default Register;

const handleSignUp = async (event) => {
	event.preventDefault();

	const form = event.target;
	const image = form.image.files[0];
	const name = form.name.value;
	const email = form.email.value;
	const password = form.password.value;
	const confirmPassword = form.confirm.value;

	if (!image) {
		alert("Please upload an image.");
		return;
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		console.log("Passwords do not match");
		return;
	}
	if (password.length < 8) {
		alert("Password must be at least 8 characters");
		console.log("Password must be at least 8 characters");
		return;
	}

	const options = {
		maxSizeMB: 0.05,
		maxWidthOrHeight: 400,
		useWebWorker: true,
	};
	const compressedImage = await imageCompression(image, options);

	const blob = await imageCompression.getFilefromDataUrl(
		await imageCompression.getDataUrlFromFile(compressedImage),
		image.type
	);

	console.log("blob", blob);
	console.log("image: ", image);

	// const formData = new FormData();
	// formData.append("image", blob);

	// const response = await fetch(
	// 	`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
	// 	{
	// 		method: "POST",
	// 		body: formData,
	// 	}
	// );
	// const data = await response.json();

	// if (data.success) {
	// 	signUp(email, password)
	// 		.then((res) => {
	// 			updateProfileInfo(name, image);

	// 			const registrationDate = new Date();
	// 			const userDocument = {
	// 				photo: data.data.url,
	// 				name: name,
	// 				email: email,
	// 				role: "general-user",
	// 				registrationDate: registrationDate.toISOString(),
	// 			};

	//
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.message);
	// 			alert(`${error.message}`);
	// 		});
	// } else {
	// 	console.log("error", "Image upload to ImgBB failed!");
	// }
};

import { storage } from "../../../firebase.config";
import { ref } from "firebase/storage"; // ref is not being used

const handleSignUp = async (event) => {
	event.preventDefault();

	const form = event.target;
	const image = form.image.files[0];
	const name = form.name.value;
	const email = form.email.value;
	const password = form.password.value;

	signUp(email, password)
		.then((res) => {
			// Create a storage reference
			const storageRef = storage.ref();
			// Create a child reference to a new file named after the user's email
			const imageRef = storageRef.child(email);
			// Upload the file to the new reference
			imageRef.put(image).then((snapshot) => {
				console.log("Uploaded a blob or file!");
				// Get the download URL of the uploaded file
				snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log("File available at", downloadURL);
					// Update the user document with the download URL of the image
					const userDocument = {
						photo: downloadURL,
						name: name,
						email: email,
					};
					console.log(userDocument);
					updateProfileInfo(name, downloadURL);
				});
			});
		})
		.catch((error) => {
			console.log(error.message);
			alert(`${error.message}`);
		});
};

/*
firebase storage rules
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {

    // This rule allows anyone with your Storage bucket reference to view, edit,
    // and delete all data in your Storage bucket. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Storage bucket will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Storage bucket will be denied until you Update
    // your rules
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2023, 11, 28);
    }
  }
}

*/
