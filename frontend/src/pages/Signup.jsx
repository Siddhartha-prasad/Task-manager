import { useState } from "react";
import API from "../api/api";

function Signup(){
    const [name, setName]= useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const signup=async () => {
        try{
            const res=await API.post("/auth/signup",{
                name,
                email,
                password
            });

            alert(res.data.message);

            //redirect to login
            window.location.href = "/";
        }catch (error){
            alert(error.response.data.message);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-500 to-indigo-600">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                <input 
                    className="border p-2 w-full mb-3"
                    placeholder="Name"
                    onChange={(e)=>setName(e.target.value)} 
                />

                <input 
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)} 
                />

                <button
                    onClick={signup}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                >
                    Signup
                </button>

                <p className="mt-3 text-sm">
                    Already have an account?
                    <a href="/" className="text-blue-500">Login</a>
                </p>


            </div>

        </div>
    );
}
export default Signup;