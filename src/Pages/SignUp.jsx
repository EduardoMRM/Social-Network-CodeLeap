import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function SignUp() {

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

    async function validateName() {
        const novoUser = {
            id: Math.random(),
            username: name
        }

        if (!nameRegex.test(name)) {
            return;
        }

        await fetch("http://localhost:3001/dados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUser)
        });

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
                        className="h-8 border rounded-xl border-gray-500 p-3" />
                </div>
                <button
                    type="submit"
                    onClick={validateName}
                    disabled={!nameRegex.test(name)}
                    className="w-28 h-8 text-white font-bold text-center bg-blue-400 rounded-md self-end hover:bg-blue-800 disabled:bg-blue-100">ENTER</button>
            </section>
        </div>
    )
}

export default SignUp