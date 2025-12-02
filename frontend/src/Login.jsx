import React from "react";
import { useState } from "react";
import {FaGoogle, FaGithub, FaApple} from "react-icons/fa";

const LoginPage = () => {

    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState ("");
    const [message, setMessage] = useState ("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage = ("checking...");


        try {
            
            const res = await fetch ("http://localhost:5000/api/auth/login",{
                method: "POST",
                headers: {
                    "content-type":"application/json",
                },
                body: JSON.stringify({email,password}),
            });

            const data = await res.json();
            setMessage(data.message);

                if (res.ok) {

                    // if login is successful, then make the token

                    localStorage.setItem("token", data.token);

                    setMessage ("Login succcessful!");

                }

                else {
                    setMessage(data.message);
                }

        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
            <div className="flex-col items-center justify-center p-8 rounded-xl shadow-xl border-blue-400 border-2 bg-gray-700">
            <h1 className="text-xl flex items-cente justify-center text-white"><a className="text-[2rem] text-blue-300">C</a>ode <a className="text-[2rem] text-blue-300">Q</a>uest</h1><br/>
            <p className="flex items-center justify-center text-white text-lg">Welcome back!</p><br/>
            <h3 className="text-[1.2rem]">Sign in into your Code Quest account</h3><br/>
            <form onSubmit={handleLogin}>
                <label for = "email">Email:</label><br/><br/>
                <input type = "text" id = "email" placeholder="e.g.John doe" className="shadow-lg p-[0.75rem] rounded min-w-full overflow-hidden border-2 border-blue-400 rounded-[2rem] bg-gray-500 input:focus-blue-200 onChange = {e => setEmail(e.target.value)}"/><br/>
                <br/><label for = "password">Password:</label><br/><br/>
                <input type="password" id = "password" placeholder = "*******" className="shadow-lg p-[0.75rem] rounded min-w-full overflow-hidden border-2 border-blue-400 rounded-[2rem] bg-gray-500 onChange = {e => setPassword(e.target.value)}"/><br/><br/>
                <button type = "submit" className="bg-blue-400 px-[3rem] w-full text-white py-[0.25rem] hover:bg-blue-500 rounded-[2rem] hover:shadow-xl">Login</button><br/><br/>
                <p className="flex items-center justify-center">or</p>
                <div className="flex items-center justify-center bg-gray-500 p-3 rounded-[2rem] mt-[1rem] mb-[1rem] border-2 border-blue-400 shadow-xl"><FaGoogle className="mr-[1rem] mt-[0.10rem] text-blue-200"/> <a className="mt-[0.1rem]]">Continue With Google</a></div>
                <div className="flex items-center justify-center bg-gray-500 p-3 rounded-[2rem] mt-[1rem] mb-[1rem] border-2 border-blue-400 shadow-xl"><FaGithub className="mr-[1rem] mt-[0.10rem] text-blue-200"/> <a className="mt-[0.1rem]]">Continue With Github</a></div>
                <div className="flex items-center justify-center"><p>Don't have an acount? <a href = "@" className="text-blue-300 hover:text-blue-500 hover:underline" >SignUp</a></p></div>

            </form>
            </div>
        </div>
    );
}

export default LoginPage;