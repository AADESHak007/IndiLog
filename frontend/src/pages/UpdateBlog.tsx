import UpdateEditor from "../components/UpdateEditor"
import NavBar from "../components/NavBar"


const UpdateBlog = () => {
  return (
    <div className="p-4">
      <NavBar />
      <div className="p-3 mx-auto w-[70%] h-[60%]">
        <UpdateEditor />
      </div>
    </div>
  )
}

export default UpdateBlog