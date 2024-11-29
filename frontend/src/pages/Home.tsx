import NavBar from "../components/NavBar"

const Home = () => {
  return (
    <div className="main h-screen p-5 w-full">
        <NavBar />
        <div className="Outet w-full h-[74%]   flex flex-col justify-center items-center ">
            <h1 className="text-8xl font-semibold mb-2 font-bokor leading-relaxed tracking-widest ">Human</h1>
            <h1 className="text-6xl font-semibold mb-4 font-bokor tracking-wider">Stories <span className="font-sevillana">&</span> Ideas</h1>
            <p className="text-sm text-zinc-400 font-bold">A place where you can write and share your thoughts freely.</p>
        </div>
        <footer className=" h-[16%] border-t-2">
          <div className="w-[70%] mx-auto  h-full flex items-center justify-evenly">
            <h3 className="text-xs font-bold" >Help</h3>
            <h3 className="text-xs font-bold">Status</h3>
            <h3 className="text-xs font-bold">About</h3>
            <h3 className="text-xs font-bold">Career</h3>
            <h3 className="text-xs font-bold">Privacy</h3>
            <h3 className="text-xs font-bold">Blog</h3>
            <h3 className="text-xs font-bold">Text to Speech</h3>
            <h3 className="text-xs font-bold">Teams</h3>
            <h3 className="text-xs font-bold">Terms</h3>
          </div>
        </footer>

    </div>
  )
}

export default Home