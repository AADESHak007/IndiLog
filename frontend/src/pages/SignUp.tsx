import Auth from "../components/Auth"
import Quote from "../components/Quote"

export const SignUp = () => {
  return (
   <div>
     <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className=""><Auth /></div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
   </div>
  )
}