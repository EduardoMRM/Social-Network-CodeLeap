import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainScreen() {

    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const tituloRegex = /^(?!\s*$).+/;
    const conteudoRegex = /^(?!\s*$).+/;
    const isTitleValid = titulo.length === 0 || tituloRegex.test(titulo);
    const isContentValid = conteudo.length === 0 || conteudoRegex.test(conteudo);
    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    async function validatePost() {
        const novoPost = {
            username: username,
            created_datetime: new Date().toISOString(),
            title: titulo,
            content: conteudo
        }

        if (!isTitleValid || !isContentValid) {
            return false;
        }

        await fetch("http://localhost:3001/dados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoPost)
        });

        setTitulo("");
        setConteudo("");

    }

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (!username) {
            navigate("/");
        }
    });

    return (
        <div className="flex flex-col bg-gray-300 h-screen w-screen items-center justify-center">
            <div className="h-screen w-3/6 bg-white flex flex-col gap-6">
                <header className="bg-blue-400 h-20">
                    <h1 className="text-white text-xl pl-9 py-6 font-bold">CodeLeap Network</h1>
                </header>
                <section className="h-80 w-11/12 self-center flex flex-col px-6 pt-6 gap-6 border rounded-2xl border-gray-400">
                    <h1 className="font-bold h-5">What's on your mind?</h1>
                    <section>
                        <p>Title</p>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Hello world"
                            className={`h-8 border rounded-xl border-gray-500 p-3 focus:outline-none w-full ${!isTitleValid ? "border-red-500" : "focus:border-blue-400"}`} />
                    </section>
                    <section>
                        <p>Content</p>
                        <input
                            type="text"
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                            placeholder="Content here"
                            className={`h-16 border rounded-xl border-gray-500 p-3 focus:outline-none w-full ${!isContentValid ? "border-red-500" : "focus:border-blue-400"}`} />
                    </section>
                    <button
                        type="submit"
                        onClick={validatePost}
                        disabled={!tituloRegex.test(titulo) || !conteudoRegex.test(conteudo)}
                        className="w-28 h-8 text-white font-bold text-center bg-blue-400 rounded-md self-end hover:bg-blue-800 disabled:bg-blue-100 cursor-pointer disabled:cursor-default">Create</button>
                </section>

                <section id="post" className="w-11/12 h-80 flex flex-col gap-6 border-t-0 border border-gray-500 rounded-2xl self-center">
                    <section className="flex justify-between text-white w-full bg-blue-400 h-20 border-2 border-blue-400 rounded-t-2xl p-6 font-bold">
                        <header>
                            text
                        </header>
                        <section>
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </section>
                    </section>
                    <section className="flex flex-col gap-4 px-6">
                        <section className="flex justify-between text-gray-500">
                            <p>asdasfaefdasfseadf</p>
                            <p>time Posted</p>
                        </section>
                        <p></p>
                    </section>
                </section>
                <section>

                </section>
            </div>
        </div>
    )
}

export default MainScreen