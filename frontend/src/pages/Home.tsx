import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className="main h-screen p-4 sm:p-6 md:p-8 w-full">
      <NavBar />
      <div className="Outet w-full h-[70%] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold mb-2 font-bokor leading-relaxed tracking-widest">
          Human
        </h1>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 font-bokor tracking-wider">
          Stories <span className="font-sevillana">&</span> Ideas
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-bold">
          A place where you can write and share your thoughts freely.
        </p>
      </div>
      <footer className="h-[16%] border-t-2">
        <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto h-full flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <h3 className="text-xs font-bold">Help</h3>
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
  );
};

export default Home;
