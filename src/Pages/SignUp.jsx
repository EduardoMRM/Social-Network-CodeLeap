import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function SignUp() {

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    const isValid = name.length === 0 || nameRegex.test(name);

    async function validateName() {
        const novoUser = {
            id: Math.floor(Math.random() * 100),
            username: name
        }

        if (!isValid) {
            return false;
        }

        await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUser)
        });

        localStorage.setItem("username", name);
        navigate("/MainScreen");
    }

    return (
        <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
            <section className="bg-white text-black flex flex-col justify-around p-6 w-lg h-52 border-2 border-gray-400 rounded-2xl">
                <h1 className="text-xl font-bold">Welcome to CodeLeap network!</h1>
                <div className="flex flex-col gap-2">
                    <p className="text-base">Please enter your username</p>
                    <input
                        type="text"
                        placeholder="John doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`h-8 border rounded-xl p-3 focus:outline-none ${!isValid ? "border-red-500" : " focus:border-blue-400"}`} />
                </div>
                <button
                    type="submit"
                    onClick={validateName}
                    disabled={!nameRegex.test(name)}
                    className="w-28 h-8 text-white font-bold text-center bg-blue-400 rounded-md self-end hover:bg-blue-800 disabled:bg-blue-100 cursor-pointer disabled:cursor-default">ENTER</button>
            </section>
        </div>
    )
}

export default SignUp