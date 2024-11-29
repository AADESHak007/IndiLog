import {SignInInput} from "@aadeshak10/common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { userDetail } from "../store/atoms"

const AuthSignin = () => {
    const navigate = useNavigate() ;
    const setUserDetail= useSetRecoilState(userDetail) ;
    const [postInputs, setPostInputs] = useState<SignInInput>({
        email: "",
        password: "",
    })
    async function sendReq(){
       try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs) ;
        const jwt = response.data.token ;
        const username =response.data.name ;
        const email = response.data.email
        if(jwt){
            setUserDetail({
                username,
                email
            })
        }
        localStorage.setItem("token",jwt);
        localStorage.setItem("username",username);
        localStorage.setItem("email",email);
        navigate("/blogs")
       } catch (error) {
        // try sending a cleaner alert 
        alert("An error occurred while trying to sign up or sign in. Please try again.")
       }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="p-2">
                    <h1 className="text-3xl font-bold">Sign in to your Account</h1>
                    <h2 className="text-lg text-slate-400">Don't have an account?<Link className="pl-2 underline" to="/signup" >Sign Up</Link></h2>

                    <div className="my-7 p-5">
                        <LabelledInputs label="email" placeholder="enter your email...." onChange={(e) => {
                            setPostInputs({ ...postInputs, email: e.target.value })
                        }} />
                        <LabelledInputs label="password" placeholder="enter the password...." onChange={(e) => {
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }} type="password" />
                        <button onClick={sendReq} className="px-3 py-2 mt-2 text-center border text-md font-semibold text-black rounded-md">Sign In</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AuthSignin

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInputs({ label, placeholder, onChange, type }: LabelledInputType,) {
    return (
        <div>
            <label className="block text-gray-900 text-sm font-bold mb-2">
                {label}
            </label>
            <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={type || "text"} placeholder={placeholder}></input>
        </div>
    )
}