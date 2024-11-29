import Editor from "../components/Editor"
import NavBar from "../components/NavBar"


const NewBlog = () => {
  return (
    <div className="p-4">
      <NavBar />
      <div>
        <Editor />
      </div>
    </div>
  )
}

export default NewBlog