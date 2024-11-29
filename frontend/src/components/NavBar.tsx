import { HiHome } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"
// import { useRecoilValue } from "recoil"
// import { userDetail } from "../store/atoms"


const NavBar = () => {
  // const userInfo = useRecoilValue(userDetail) ;
  const navigate = useNavigate() ;
  const handleLogout = ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate('/') ;
    // setUserDetail(null) ; // Clear user detail state when logged out.
  }
  const handleLogin = () => {
    navigate('/signin') ;
  }


  return (
    <div className="px-10 py-3 border-b-2 border-zinc-800 flex items-center mx-8 justify-between">
      <Link to='/blogs' className="left text-4xl font-bold font-sevillana mb-2">IndiLog</Link>
      <div className="right flex gap-5 items-center mb-2">
        <Link to='/publish' className="text-white bg-green-700 hover:bg-green-800  font-medium rounded-full text-sm px-5 py-2 text-center">NEW</Link>
        <div className="flex flex-col justify-center">
          {localStorage.getItem("username")? <Avataar name={localStorage.getItem("username")} size ={28} /> : <button onClick={handleLogin} className="px-4 py-2 border-2 border-white rounded-full text-white bg-black font-semibold text-xs">GET STARTED</button>}
        </div>
        {(localStorage.getItem("token") ? <div>
          <button onClick={handleLogout} className="px-4 py-2 border-2 border-white rounded-full text-white bg-black font-semibold text-xs">LOGOUT</button>
        </div> :<></>)}

        <HiHome className="text-md cursor-pointer" onClick={()=>{
          navigate('/') ;
        }} />
      </div>

    </div>
  )
}

export default NavBar