import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainScreen() {

    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const tituloRegex = /^(?!\s*$).+/;
    const conteudoRegex = /^(?!\s*$).+/;
    const isTitleValid = titulo.length === 0 || tituloRegex.test(titulo);
    const isContentValid = conteudo.length === 0 || conteudoRegex.test(conteudo);
    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    })

    useEffect(() => {
        const username = localStorage.getItem("username");

        if (!username) {
            navigate("/");
        }
    });

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);

    }, []);

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

        const response = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoPost)
        });

        const data = await response.json();
        setPosts([...posts, data]);

        setTitulo("");
        setConteudo("");

    }

    async function deletePost(id) {
        await fetch(`http://localhost:3001/posts/${id}`, {
            method: "DELETE"
        })
        setPosts(posts.filter(post => post.id !== id));

    }

    function openEditModal(post) {
        setIsModalOpen(true);
        setEditingPost(post);
        setEditTitle(post.title);
        setEditContent(post.content);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingPost(null);
    }

    async function editPost(id) {
        const editedPost = {
            id: editingPost.id,
            username: editingPost.username,
            created_datetime: editingPost.created_datetime,
            title: editTitle,
            content: editContent
        }

        const response = await fetch(`http://localhost:3001/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPost)
        });

        const data = await response.json();
        setPosts(posts.map(post => post.id === id ? data : post));

        setIsModalOpen(false);
    }

    function timePosted(date) {
        const now = currentTime;
        const past = new Date(date);

        const diffInSeconds = Math.floor((now - past) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (diffInSeconds < 60) {
            return "just now";
        }

        if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        }

        if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }

        if (days < 30) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }

        if (months < 12) {
            return `${months} month${months > 1 ? "s" : ""} ago`;
        }

        return `${years} year${years > 1 ? "s" : ""} ago`;

    }


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

                <section className="grid grid-cols-1 gap-6 overflow-y-auto w-11/12 max-h-[60vh] self-center pr-1">

                {posts
                    .sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime))
                    .map((post) => (
                            <section key={post.id} className="h-80 flex flex-col gap-6 border-t-0 border border-gray-500 rounded-2xl self-center">
                                <section className="flex justify-between text-white w-full bg-blue-400 h-20 border-2 border-blue-400 rounded-t-2xl p-6 font-bold">
                                    <header>
                                        {post.title || "No title"}
                                    </header>
                                    {post.username === username && <section className="flex gap-6">
                                        <button onClick={() => deletePost(post.id)}>
                                            <img src="/src/assets/deleteBtn.png" alt="delete buton" className="w-8 h-7 cursor-pointer" />
                                        </button>
                                        <button onClick={() => openEditModal(post)}>
                                            <img src="/src/assets/editBtn.png" alt="edit buton" className="w-8 h-7 cursor-pointer" />
                                        </button>
                                    </section>}
                                </section>
                                <section className="flex flex-col h-5 gap-4 px-6">
                                    <section className="flex justify-between text-gray-500">
                                        <p>@{post.username || "unknown"}</p>
                                        <p>{timePosted(post.created_datetime)}</p>
                                    </section>
                                    <p>{post.content || ""}</p>
                                </section>
                            </section>
                    ))}
            </section>
            </div>

            {isModalOpen && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white w-96 p-6 rounded-2xl flex flex-col gap-4">

                        <h2 className="font-bold text-lg">Edit Post</h2>

                        <div>
                            <p>Title</p>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="border w-full p-2 rounded"
                            />
                        </div>

                        <div>
                            <p>Content</p>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="border w-full p-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-4">

                            <button
                                onClick={closeModal}
                                className="border px-4 py-1 rounded cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => editPost(editingPost.id)}
                                className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </div>

            )}


        </div>
    )
}

export default MainScreen