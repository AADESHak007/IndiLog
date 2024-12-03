// import { SignupInput } from "@aadeshak10/common"
// import axios from "axios"
// import { ChangeEvent, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { BACKEND_URL } from "../config"
// import { useSetRecoilState } from "recoil"
// import { userDetail } from "../store/atoms"

// const Auth = () => {
//     const navigate = useNavigate();
//     const setUserDetail = useSetRecoilState(userDetail);
//     const [postInputs, setPostInputs] = useState<SignupInput>({
//         name: "",
//         email: "",
//         password: ""
//     })
//     async function sendReq() {
//         try {
//             const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
//             const jwt = response.data.token;
//             const username = response.data.name;
//             const email = response.data.email
//             if (jwt) {
//                 setUserDetail({
//                     username,
//                     email
//                 })
//             }
//             localStorage.setItem("token", jwt);
//             localStorage.setItem("username", username);
//             localStorage.setItem("email", email);
//             navigate("/blogs")
//         } catch (error) {
//             // try sending a cleaner alert 
//             alert("An error occurred while trying to sign up or sign in. Please try again.")
//         }
//     }

//     return (
//         <div className="h-screen flex justify-center flex-col">
//             <div className="flex justify-center">
//                 <div className="p-2">
//                     <h1 className="text-3xl font-bold">Create an Account</h1>
//                     <h2 className="text-lg text-slate-400">Already have an account?<Link className="pl-2 underline" to="/signin" >Log In</Link></h2>

//                     <div className="my-7 p-5">
//                         <LabelledInputs label="name" placeholder="enter your name...." onChange={(e) => {
//                             setPostInputs({ ...postInputs, name: e.target.value })
//                         }} />
//                         <LabelledInputs label="email" placeholder="enter your email...." onChange={(e) => {
//                             setPostInputs({ ...postInputs, email: e.target.value })
//                         }} />
//                         <LabelledInputs label="password" placeholder="enter the password...." onChange={(e) => {
//                             setPostInputs({ ...postInputs, password: e.target.value })
//                         }} type="password" />
//                         <button onClick={sendReq} className="px-3 py-2 mt-2 text-center border text-md font-semibold text-black rounded-md">Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Auth

// interface LabelledInputType {
//     label: string;
//     placeholder: string;
//     onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//     type?: string;
// }
// function LabelledInputs({ label, placeholder, onChange, type }: LabelledInputType,) {
//     return (
//         <div>
//             <label className="block text-gray-900 text-sm font-bold mb-2">
//                 {label}
//             </label>
//             <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={type || "text"} placeholder={placeholder}></input>
//         </div>
//     )
// }

import { SignupInput } from "@aadeshak10/common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { userDetail } from "../store/atoms";

const Auth = () => {
    const navigate = useNavigate();
    const setUserDetail = useSetRecoilState(userDetail);
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendReq() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data.token;
            const username = response.data.name;
            const email = response.data.email;
            if (jwt) {
                setUserDetail({
                    username,
                    email
                });
            }
            localStorage.setItem("token", jwt);
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            navigate("/blogs");
        } catch (error) {
            alert("An error occurred while trying to sign up or sign in. Please try again.");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col bg-gray-50 px-4 md:px-0">
            <div className="flex justify-center">
                <div className="p-4 w-full max-w-md bg-white shadow-md rounded-md">
                    <h1 className="text-2xl md:text-3xl font-bold text-center">Create an Account</h1>
                    <h2 className="text-sm md:text-lg text-slate-400 text-center mt-2">
                        Already have an account?
                        <Link className="pl-2 underline text-blue-600" to="/signin">Log In</Link>
                    </h2>

                    <div className="my-7 p-5">
                        <LabelledInputs
                            label="Name"
                            placeholder="Enter your name..."
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, name: e.target.value });
                            }}
                        />
                        <LabelledInputs
                            label="Email"
                            placeholder="Enter your email..."
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, email: e.target.value });
                            }}
                        />
                        <LabelledInputs
                            label="Password"
                            placeholder="Enter the password..."
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, password: e.target.value });
                            }}
                            type="password"
                        />
                        <button
                            onClick={sendReq}
                            className="w-full px-3 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white text-md font-semibold rounded-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInputs({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block text-gray-900 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type || "text"}
                placeholder={placeholder}
            />
        </div>
    );
}
