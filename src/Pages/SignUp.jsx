
function SingUp() {
    return (
        <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
            <section className="bg-white text-black flex flex-col justify-around p-6 w-lg h-52 border-2 border-gray-400 rounded-2xl">
                <h1 className="text-xl font-bold">Welcome to CodeLeap network!</h1>
                <div className="flex flex-col gap-2">
                    <p className="text-base">Please enter your username</p>
                    <input type="text" placeholder="John doe" className="h-8 border rounded-xl border-gray-500 p-3" />
                </div>
                <button id="name" className="w-28 h-8 text-white font-bold text-center bg-blue-400 rounded-md self-end" type="submit">ENTER</button>

            </section>
        </div>
    )
}

export default SingUp